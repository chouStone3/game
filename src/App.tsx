import FilterableProduct from "./FilterableProduct";
import PragueReducer from "./Prague-reducer";
import Prague from "./PragueItinerary";
import TicTacToe from "./TicTacToe/index";
import ChatAPP from "./contactList-Chat";

export default function Domes() {

  return <>
    <TicTacToe />
    <br/>
    <FilterableProduct />
    <br/>
    <Prague/>
    <br/>
    <PragueReducer></PragueReducer>
    <br/>
    <ChatAPP/>
  </>;
}