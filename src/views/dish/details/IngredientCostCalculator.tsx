import { Accordion, Col, Form, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import ProductCostCalculator from "./ProductCostCalculator";
import { calcIngredientCost, IngredientCostCalculatorModel, ProductCostCalculatorModel } from "../../../models/dish/DishCostCalculatorState";
import TooltipIcon from "../../shared/TooltipIcon";


interface IngredientCostCalculatorProps{
    ingredient: IngredientCostCalculatorModel
    superior?: IngredientCostCalculatorModel
    setState: (state:IngredientCostCalculatorModel)=>void
}

function IngredientCostCalculator({ingredient, setState, superior}:IngredientCostCalculatorProps) {


    const products = ingredient.products
    const ingredients = ingredient.ingredients

    function setProductCalculatorState(state: ProductCostCalculatorModel){
        setState(calcIngredientCost({...ingredient, products:ingredient.products?.map(p=>p.key==state.key?state:p)}))
    }
    function setIngredientCalculatorState(state: IngredientCostCalculatorModel){
        setState(calcIngredientCost({...ingredient, ingredients:ingredient.ingredients?.map(i=>i.key==state.key?state:i)}))
    }
    
    return(
            <Accordion.Item eventKey={`${ingredient.id}`}>
                <Accordion.Header>
                    {ingredient.name} - {Number(ingredient.cost).toFixed(2)} руб.
                    {ingredient.products && ingredient.products.find(p=>!(p.selected?.is_relevant??true))!=undefined
                        ?<TooltipIcon tooltip="Не актуальные позиции закупки" textColor="warning" icon="exclamation-triangle-fill"/>
                        :<></>
                    }
                </Accordion.Header>
                <Accordion.Body>
                    <Table className='text-center' cellPadding={3} cellSpacing={3}>
                        <tbody>
                            {products?.map(p=>
                                <ProductCostCalculator setState={setProductCalculatorState} product={p}/>
                            )}
                        </tbody>
                    </Table>
                    <Accordion>

                    {
                        ingredients?.map(i=>
                            <IngredientCostCalculator setState={setIngredientCalculatorState} ingredient={i} superior={ingredient}/>
                        )
                    }
                    </Accordion>
                </Accordion.Body>
            </Accordion.Item>
    )
}
export default IngredientCostCalculator;
