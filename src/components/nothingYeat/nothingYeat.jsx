import "../nothingYeat/nothingYeat.css"

const NothingYeat = ({message}) => {
    //////////////// 
    // message for text
    ////////////////
return (
<>
    <p className="flex jy-center items-center h-200 nothing-p" >{message ? message : "Пока ничего нет"}</p>
</>
);
}
export default NothingYeat;