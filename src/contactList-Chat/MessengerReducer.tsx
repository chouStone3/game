interface Iaction {
    type : 'changed_selection' | 'edited_message' | 'sent_message',
    contactId: number,
    message?: string,
}

interface Istate {
    selectedId: number,
    message: string
}


export const initialState = {
    selectedId: 0,
    messages: {}
}

export function messengerReducer(state: any, action: Iaction) {
    switch (action.type) {
        case 'changed_selection':
            return {
                ...state,
                selectedId: action.contactId
            }
            break;
        case 'edited_message':
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.contactId]: action.message
                }
            }
            break;
        case 'sent_message':
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.contactId]: ''
                }
            }
            break;
        default: {
            throw Error('未知 action: ' + action.type);
        }
    }

}
