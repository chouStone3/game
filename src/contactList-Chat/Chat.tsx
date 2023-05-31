import styled from "styled-components";
import { Icontact } from ".";

export default function Chat({ contact, message, dispatch }: { contact: Icontact, message: string, dispatch: any }) {

    return <Div>
        <Textarea
            value={message}
            placeholder={`和` + contact.name + `聊天`}
            onChange={(e) => {
                dispatch({
                    type: 'edited_message',
                    contactId: contact.id,
                    message: e.target.value
                })
            }}
        />
        <br />
        <Button
            onClick={() => {
                dispatch({ type: 'sent_message', contactId: contact.id })
                alert(`正在发送${message}到${contact.email}`)
            }}
        >{`发送到` + contact.email}</Button>
    </Div>
}

const Textarea = styled.textarea`
    height: 150px;
`

const Button = styled.button``

const Div = styled.div`
    margin-left: 10px;
    float: left;
`