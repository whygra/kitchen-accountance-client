import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"


function BrowseCreateProjectBtn() {

    return(
      <div className="d-flex flex-column align-items-center text-center">
        <Link to='/projects/create'><Button variant="success" className="rounded-pill"><i/> Создать проект</Button></Link>
        или<Link to='/projects/all'>Смотреть готовые</Link>
      </div>
    )
}

export default BrowseCreateProjectBtn