import React, {useCallback} from "react";
import { List, Segment } from "semantic-ui-react"; 
import { observer } from "mobx-react-lite";

/**
 * Worked Hour Item
 */

 export default observer( (props) => {
  const whItem = props.item;
  
  function updateHours(newHours) {
    console.log(newHours);
  } 

  return (
    <div>
      <Segment.Group>
        <Segment attached color="blue">
          <List.Item key={whItem._id}>
          <List.Content> 
        Hours:   <div class="ui fluid input" >
        <input name="hourInput" type="number" min="0" value={whItem.hours} onChange={() => {updateHours('x')}}/>                
                        </div>
            
          </List.Content>
        </List.Item>
        </Segment>
        
      </Segment.Group>
      
    </div>
  )});
//onClick={useCallback(() => props.history.push("workedhours/" + whItem._id))}
//<i className="refresh icon" />
//<div className="ui bottom attached button" onClick={ () => updateHours()}>            
//                  update
//            </div>
// 
            