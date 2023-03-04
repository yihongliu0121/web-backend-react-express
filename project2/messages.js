const uuid = require('uuid').v4;

const id1 = uuid();
const id2 = uuid();

const messageList = {
    [id1]: {
        id: id1,
        sender: "Administrator",
        text: "Welcome everyone!",
    },
    [id2]: {
        id: id2,
        sender: "SamplePerson",
        text: "Hello All",
    },
};

function addMessage(sender, text) {
    const id = uuid();
    messageList[id] = {
      id, //uuid
      sender, //string
      text, //string
    };
}

const messages = {
    messageList,
    addMessage,
};

module.exports = messages;