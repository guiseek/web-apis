import {
  css,
  html,
  child,
  listen,
  Connected,
  Autonomous,
  AfterQueued,
  AfterConnected,
} from '@web-apis/ui-web';
import './app.element.scss';

class SessionDescription extends RTCSessionDescription {
  override sdp!: string;
  override type!: RTCSdpType;

  constructor(init: RTCSessionDescriptionInit) {
    super(init);
    if (init.sdp) this.sdp = init.sdp;
    if (init.type) this.type = init.type;
  }
}

@Autonomous('app-root')
export class AppElement
  extends HTMLElement
  implements Connected, AfterConnected, AfterQueued
{
  styles = css`
    :host {
      display: flex;
      flex-direction: column;
    }
    :host > div {
      display: flex;
      gap: 24px;
    }
  `;

  template = html`
    <div>
      <video id="vid1" is="web-video" autoplay muted></video>
      <video id="vid2" is="web-video" autoplay></video>
    </div>
    <div>
      <button id="call">Call</button>
      <button id="accept" disabled>Accept</button>
      <button id="hangup" disabled>Hangup</button>
    </div>
  `;

  @child('video#vid1')
  vid1!: HTMLVideoElement;

  @child('video#vid2')
  vid2!: HTMLVideoElement;

  @child('button#call')
  callButton!: HTMLButtonElement;

  @child('button#accept')
  acceptButton!: HTMLButtonElement;

  @child('button#hangup')
  hangUpButton!: HTMLButtonElement;

  @listen('button#call', 'click', 'target')
  onCallClick(button: HTMLButtonElement) {
    button.disabled = !button.disabled;
    this.acceptButton.disabled = false;
    this.hangUpButton.disabled = false;
    if (button.disabled) this.start();
  }

  @listen('button#accept', 'click', 'target')
  onAcceptClick(button: HTMLButtonElement) {
    button.disabled = !button.disabled;
    if (button.disabled) this.accept();
  }

  @listen('button#hangup', 'click', 'target')
  onHangUpClick(button: HTMLButtonElement) {
    button.disabled = !button.disabled;
    if (button.disabled) this.stop();
  }

  localStream = new MediaStream();
  remoteStream = new MediaStream();
  pc1 = new RTCPeerConnection();
  pc2 = new RTCPeerConnection();

  offerOptions = {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true,
  };

  async connected() {
    this.localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    this.vid1.srcObject = this.localStream;
  }

  afterConnected() {
    console.log(this.vid1);
    console.log(this.vid2);
    console.log(this.callButton);
    console.log(this.acceptButton);
  }

  afterQueued() {
    console.log('afterQueued');
  }

  start() {
    console.log('Starting Call');
    const videoTracks = this.localStream.getVideoTracks();
    const audioTracks = this.localStream.getAudioTracks();
    if (videoTracks.length > 0) {
      console.log(`Using Video device: ${videoTracks[0].label}`);
    }
    if (audioTracks.length > 0) {
      console.log(`Using Audio device: ${audioTracks[0].label}`);
    }

    const servers = {};
    this.pc1 = new RTCPeerConnection(servers);

    console.log('Created local peer connection object pc1');
    this.pc1.onicecandidate = (e) => this.onIceCandidate(this.pc1, e);
    this.pc2 = new RTCPeerConnection(servers);

    console.log('Created remote peer connection object pc2');
    this.pc2.onicecandidate = (e) => this.onIceCandidate(this.pc2, e);
    this.pc2.ontrack = (e) => this.gotRemoteStream(e);

    this.localStream
      .getTracks()
      .forEach((track) => this.pc1.addTrack(track, this.localStream));
    console.log('Adding Local Stream to peer connection');

    this.pc1
      .createOffer(this.offerOptions)
      .then(
        (offer) => this.gotDescription1(new SessionDescription(offer)),
        this.onCreateSessionDescriptionError
      );
  }

  accept() {
    this.pc2
      .createAnswer()
      .then(
        (answer) => this.gotDescription3(new SessionDescription(answer)),
        this.onCreateAnswerError
      );
    this.acceptButton.disabled = true;
    this.callButton.disabled = true;
  }

  stop() {
    console.log('Ending Call' + '\n\n');
    this.pc1.close();
    this.pc2.close();
    this.localStream.getTracks().forEach((t) => t.stop());
    this.acceptButton.disabled = true;
    this.callButton.disabled = false;
    this.hangUpButton.disabled = true;
  }

  onIceCandidate(pc: RTCPeerConnection, ev: RTCPeerConnectionIceEvent) {
    if (ev.candidate) {
      this.getOtherPc(pc)
        .addIceCandidate(ev.candidate)
        .then(
          () => this.onAddIceCandidateSuccess(),
          (err) => this.onAddIceCandidateError(err)
        );

      console.log(
        `${this.getName(pc)} ICE candidate:\n${
          ev.candidate ? ev.candidate.candidate : '(null)'
        }`
      );
    }
  }

  gotRemoteStream(ev: RTCTrackEvent) {
    this.vid2.srcObject = this.remoteStream;
    this.remoteStream.addTrack(ev.track);
  }

  gotDescription1(desc: SessionDescription) {
    this.pc1
      .setLocalDescription(desc)
      .then(this.onSetLocalDescriptionSuccess, this.onSetLocalDescriptionError);
    console.log(`Offer from pc1\n${desc.sdp}`);
    this.pc2.setRemoteDescription(desc);
    // Since the 'remote' side has no media stream we need
    // to pass in the right constraints in order for it to
    // accept the incoming offer of audio and video.
    this.pc2
      .createAnswer()
      .then(
        (answer) => this.gotDescription2(new SessionDescription(answer)),
        this.onCreateSessionDescriptionError
      );
  }

  gotDescription2(desc: SessionDescription) {
    // Provisional answer, set a=inactive & set sdp type to pranswer.
    desc.sdp = desc.sdp.replace(/a=recvonly/g, 'a=inactive');
    desc.type = 'pranswer';
    this.pc2
      .setLocalDescription(desc)
      .then(this.onSetLocalDescriptionSuccess, this.onSetLocalDescriptionError);
    console.log(`Pranswer from pc2\n${desc.sdp}`);
    this.pc1.setRemoteDescription(desc);
  }

  gotDescription3(desc: SessionDescription) {
    // Final answer, setting a=recvonly & sdp type to answer.
    desc.sdp = desc.sdp.replace(/a=inactive/g, 'a=recvonly');
    desc.type = 'answer';
    this.pc2
      .setLocalDescription(desc)
      .then(this.onSetLocalDescriptionSuccess, this.onSetLocalDescriptionError);
    console.log(`Answer from pc2\n${desc.sdp}`);
    this.pc1.setRemoteDescription(desc);
  }

  onAddIceCandidateSuccess() {
    console.log('AddIceCandidate success.');
  }

  onAddIceCandidateError(error: RTCError) {
    console.log(`Failed to add Ice Candidate: ${error.toString()}`);
  }

  onSetLocalDescriptionSuccess = () => {
    console.log('localDescription success.');
  };
  onCreateSessionDescriptionError = (error: RTCError) => {
    console.log(`Failed to create session description: ${error.toString()}`);
    stop();
  };
  onSetLocalDescriptionError = (error: RTCError) => {
    console.log(`Failed to set setLocalDescription: ${error.toString()}`);
    stop();
  };
  onCreateAnswerError = (error: RTCError) => {
    console.log(`Failed to set createAnswer: ${error.toString()}`);
    stop();
  };

  getOtherPc(pc: RTCPeerConnection) {
    return pc === this.pc1 ? this.pc2 : this.pc1;
  }
  getName(pc: RTCPeerConnection) {
    return pc === this.pc1 ? 'pc1' : 'pc2';
  }
}
