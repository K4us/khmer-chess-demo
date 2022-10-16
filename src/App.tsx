import "./App.css";

import { KhmerChessBoardComp, PIECE_COLOR_BLACK } from "khmer-chess-board";
import kcb from "khmer-chess-board/package.json";
import kcai from "khmer-chess-ai/package.json";
import { KhmerChessAI } from "khmer-chess-ai";

export default function App() {
    return (
        <div className="App">
            <h3>Khmer Chess by K4us</h3>
            <KhmerChessBoardComp
                width={600}
                isQuickMove={true}
                isSoundEnabled={true}
                load={(kcb) => {
                    (window as any).kcb = kcb;
                    const khmerChessAI = new KhmerChessAI({
                        khmerChess: kcb.khmerChess,
                        turn: PIECE_COLOR_BLACK,
                    });
                    kcb.boardManager.addBoardStatusEventListener((boardStatusEvent) => {
                        if (boardStatusEvent.isWin) {
                            alert(boardStatusEvent.message);
                        } else if (boardStatusEvent.isMoving && khmerChessAI.isAITurn) {
                            const result = khmerChessAI.attemptMove();
                            if (result) {
                                kcb.move(result.fromIndex, result.toIndex);
                            } else {
                                alert("Fail to attempt move");
                            }
                        }
                    });
                    kcb.playManager.play();
                }} />
            <h4>Build With:</h4>
            <a href={kcb.homepage}>Khmer Chess Board v{kcb.version}</a>
            <br />
            <a href={kcai.homepage}>Khmer Chess AI v{kcai.version}</a>
        </div>
    );
}
