import TooltipButton from "./TooltipButton"

interface HistoryNavProps {
    history: {undo:()=>void, canUndo:boolean}
    reloadFn: ()=>void
}

function HistoryNav({reloadFn, history}:HistoryNavProps) {
    return (
        <div className="d-flex justify-content-end">
        <TooltipButton
          disabled={!history.canUndo}
          onClick={history.undo}
          variant='light'
          tooltip='отменить последнее действие'
        ><i className="bi bi-arrow-90deg-left"/></TooltipButton>
        <TooltipButton
          onClick={reloadFn}
          variant='light'
          tooltip='перезагрузить/сброс'
        ><i className="bi bi-arrow-clockwise"/></TooltipButton>
      </div>
    )
}

export default HistoryNav