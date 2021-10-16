require("../style/talk-input.scss");

import React from "react";
import PropTypes from "prop-types";

const isBlank = require("is-blank");
const SEND_ICON = "📤";

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
        <button className="talk-input-emojis-toggle" onClick={this.toggleEmojisPanel}>{this.emojis[0]}</button>
        <button className="talk-input-submit" onClick={this.onEnterPress}>{SEND_ICON}</button>
        {this.state.emojisPanelOpen && <div className="talk-input-emojis-panel">
          {this.emojis.map(emoji => <span onClick={this.onEmojiClick(emoji)}>{emoji}</span>)}
          <button className="talk-input-emojis-panel-close" onClick={this.toggleEmojisPanel}>x</button>
        </div>}
      </div>
    );
  }
}

export default TalkInput;
