import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import { BASE_API, POST_PATH } from "../../constants/api";

export default function Emoji({ data }) {
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);

  function toggleEmojiPanel() {
    setShowEmojiPanel(!showEmojiPanel);
  }

  let { id } = useParams();

  async function onClick(emoji) {
    const getToken = window.localStorage.getItem("token");
    const reaction = BASE_API + POST_PATH + `/${id}/react/${emoji.emoji}`;

    await axios({
      method: "put",
      url: reaction,
      data: emoji,
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    });
    setShowEmojiPanel(!showEmojiPanel);
    window.location.reload();
  }

  return (
    <div class="reactbtn">
      <button className="feedReactBtn"  onClick={toggleEmojiPanel }>
        React to post
      </button>
      {showEmojiPanel && <EmojiPicker height="28em" width="100%" onEmojiClick={onClick} />}
    </div>
  );
}
