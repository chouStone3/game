import { useReducer } from "react";
import ContactList from "./ContactList";
import { messengerReducer, initialState } from "./MessengerReducer";
import Chat from "./Chat";

export interface Icontact { id: number, name: string, email: string }

export default function ChatAPP() {
    const [state, dispatch] = useReducer(messengerReducer, initialState);
    const contact = contacts.find((con) => con.id === state.selectedId) ?? { id: 0, name: 'Taylor', email: 'taylor@mail.com' }
    const message = state.messages[state.selectedId]
    return <>
        <ContactList
            contacts={contacts}
            selectedId={state.selectedId}
            dispatch={dispatch} />
        <Chat
            key={contact?.id}
            contact={contact}
            message={message}
            dispatch={dispatch} />
    </>
}


const contacts: Icontact[] = [
    { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
    { id: 1, name: 'Alice', email: 'alice@mail.com' },
    { id: 2, name: 'Bob', email: 'bob@mail.com' },
];