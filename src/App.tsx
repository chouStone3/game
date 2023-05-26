import FilterableProduct from "./FilterableProduct";
import PragueReducer from "./Prague-reducer";
import Prague from "./PragueItinerary";
import TicTacToe from "./TicTacToe/index"

export default function Domes() {

  return <>
    <TicTacToe />
    <br></br>
    <FilterableProduct />
    <br></br>
    <Prague/>
    <br></br>
    <PragueReducer></PragueReducer>
  </>;
}