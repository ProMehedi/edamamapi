const Recipe = (props) => {
  return (
    <div className={`col col-md-${props.column}`}>
      <div className="recipe">
        <div className="imgWrap">
          <img src={props.image} />
        </div>
        <h4 className="title">{props.title}</h4>
        <div className="recipeContent">
          <h4>Calories: {props.calories.toFixed(2)}</h4>
          <h4>Diet Labels: {props.dietLabels}</h4>
          <h4>Total Time: {props.totalTime}</h4>
        </div>
      </div>
    </div>
  )
}

export default Recipe;