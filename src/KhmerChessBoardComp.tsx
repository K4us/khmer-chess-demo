import React from "react";
import { KhmerChessAI } from "khmer-chess-ai";
import { KhmerChessBoard, BoardStatusEvent } from "khmer-chess-board";
import { PIECE_COLOR_BLACK } from "khmer-chess";

export type Props = {
    width: number;
};

class KhmerChessBoardComp extends React.Component<Props> {
    myRef: React.RefObject<HTMLDivElement>;
    khmerChessBoard: KhmerChessBoard | null = null;
    constructor(props: any) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        const container = this.myRef.current;
        this.khmerChessBoard = new KhmerChessBoard();
        const kcb = this.khmerChessBoard;
        kcb.pieceShadowManager.quickMove(true);
        kcb.setOptions({
            width: this.props.width,
            container
        });
        kcb.soundManager.enable();
        const khmerChessAI = new KhmerChessAI({
            khmerChess: kcb.khmerChess,
            turn: PIECE_COLOR_BLACK
        });

        kcb.boardManager.addBoardStatusEventListener(
            (boardStatusEvent: BoardStatusEvent) => {
                console.log(boardStatusEvent.message);
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
            }
        );

        kcb.playManager.play();
    }

    componentWillUnmount() {
        this.khmerChessBoard?.destroy();
        this.khmerChessBoard = null;
    }

    render() {
        return <div className="container" ref={this.myRef}></div>;
    }
}

export default KhmerChessBoardComp;
