require("../style/talk-input.scss");

import React from "react";
import PropTypes from "prop-types";

const isBlank = require("is-blank");
const SEND_ICON = "";

class TalkInput extends React.Component {

  static propTypes = {
    onSendMessage: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    placeHolder: "Send a message",
    disabled: false
  }

  emojis = [
    "😀",
    "😆",
    "😍",
    "❤",
    "😂",
  ];

  constructor(props) {
    super(props);
    this.state = {
      message: "",
      disabled: props.disabled,
      emojisPanelOpen: false,
    };
  }

  onEnterPress = () => {
    if (!isBlank(this.state.message)) {
      if (this.props.onSendMessage(this.state.message)) {
        this.setState({ message: "" });
      }
    }
  }

  handleOnChange = (e) => {
    this.setState({ message: e.target.value });
  }

  catchReturn = (e) => {
    if (!(e.ctrlKey || e.shiftKey) && e.key === "Enter") {
      this.onEnterPress();
      e.preventDefault();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.disabled !== nextProps.disabled) {
      this.setState({disabled: nextProps.disabled});
    }
  }

  onEmojiClick(emoji) {
    return () => this.setState({message: this.state.message + emoji});
  };

  toggleEmojisPanel = () => {
    this.setState({emojisPanelOpen: !this.state.emojisPanelOpen});
  }

  render() {
    return (
      <div className="talk-input-wrapper">
        <textarea cols="60" rows="3"
          className="talk-input-raw" onChange={this.handleOnChange}
          value={this.state.message} onKeyPress={this.catchReturn}
          disabled={(this.state.disabled) ? "disabled" : ""}
          placeholder={this.props.placeHolder}/>
        <button className="talk-input-emojis-toggle" onClick={this.toggleEmojisPanel}>
          <EmojiIcon />
        </button>
        <button className="talk-input-submit" onClick={this.onEnterPress}><SubmitIcon /></button>
        {this.state.emojisPanelOpen && <div className="talk-input-emojis-panel">
          {this.emojis.map(emoji => <span onClick={this.onEmojiClick(emoji)}>{emoji}</span>)}
          <button className="talk-input-emojis-panel-close" onClick={this.toggleEmojisPanel}>x</button>
        </div>}
      </div>
    );
  }
}

const EmojiIcon = () => {
  return (<svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_1"
    data-name="Layer 1"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path d="M12,24A12,12,0,1,1,24,12,12.013,12.013,0,0,1,12,24ZM12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm5.666,13.746a1,1,0,0,0-1.33-1.494A7.508,7.508,0,0,1,12,16a7.509,7.509,0,0,1-4.334-1.746,1,1,0,0,0-1.332,1.492A9.454,9.454,0,0,0,12,18,9.454,9.454,0,0,0,17.666,15.746ZM6,10c0,1,.895,1,2,1s2,0,2-1a2,2,0,0,0-4,0Zm8,0c0,1,.895,1,2,1s2,0,2-1a2,2,0,0,0-4,0Z" />
  </svg>);
};

const SubmitIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Outline"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <path d="M23,24a1,1,0,0,1-1-1,6.006,6.006,0,0,0-6-6H10.17v1.586A2,2,0,0,1,6.756,20L.877,14.121a3,3,0,0,1,0-4.242L6.756,4A2,2,0,0,1,10.17,5.414V7H15a9.01,9.01,0,0,1,9,9v7A1,1,0,0,1,23,24ZM8.17,5.414,2.291,11.293a1,1,0,0,0,0,1.414L8.17,18.586V16a1,1,0,0,1,1-1H16a7.984,7.984,0,0,1,6,2.714V16a7.008,7.008,0,0,0-7-7H9.17a1,1,0,0,1-1-1Z" />
    </svg>
  );
};


export default TalkInput;
