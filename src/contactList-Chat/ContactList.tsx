import styled from "styled-components";
import { Icontact } from ".";

export default function ContactList({ contacts, selectedId, dispatch }: { contacts: Icontact[], selectedId: number, dispatch: any }) {

    return <Section>
        <Ul>
            {contacts.map((contact) => {
                return <Li key={contact.id}>
                    <Button
                        onClick={() => {
                            dispatch({
                                type: 'changed_selection',
                                contactId: contact.id
                            })
                        }}>
                        {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}</Button>
                </Li>
            })}
        </Ul>

    </Section>
}

const Button = styled.button`
width: 70px;
`

const Section = styled.section`
float:left;
`

const Ul = styled.ul``

const Li = styled.li`
list-style-type: none
`