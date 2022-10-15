import "./styles.css";

import KhmerChessBoardComp from "./KhmerChessBoardComp";
const kcb = require("khmer-chess-board/package.json");
const kcai = require("khmer-chess-ai/package.json");

export default function App() {
    return (
        <div className="App">
            <h3>Khmer Chess by K4us</h3>
            <KhmerChessBoardComp
                width={600}
                ref={(kcbc) => {
                    (window as any).kcbc = kcbc;
                }}
            />
            <h4>Build With:</h4>
            <a href={kcb.homepage}>Khmer Chess Board v{kcb.version}</a>
            <br />
            <a href={kcai.homepage}>Khmer Chess AI v{kcai.version}</a>
        </div>
    );
}
