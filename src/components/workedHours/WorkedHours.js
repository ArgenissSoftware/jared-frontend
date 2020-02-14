import React, { useEffect } from "react";
import _ from 'lodash';
import { useLocalStore, observer } from "mobx-react-lite";
import WorkedHoursService from "../../services/workedHours.service";
import { useAuthStore } from "../../stores/AuthStore";
import { Segment, List, Header } from "semantic-ui-react";
import WorkedHourItem from "./WorkedHourItem";

/**
 *worked hour List Component
 * @param {Object} props
 */

 export default observer((props) => {

    const authStore = useAuthStore();
    
    const localStore = useLocalStore( () => ({
      list:[],
      setList(value) {
        this.list = value;
      },
      async getList() {
        const response =  await WorkedHoursService.getHours(authStore.user._id, '5de7ba685a461b008ca4da09', 2015, 11);
          this.setList(response.data.data.list);
      }
    }));

    useEffect( () => {
      localStore.getList();
    }, []);

    

  return (
    <div className="ui container aligned">
      <Header as="h3" icon="clock outline" content="Worked Hours" />

      <Segment.Group>
        <Segment attached color="blue" >
          <List divided relaxed verticalAlign='middle' size='large'>
          { localStore.list.map( (x)=>  <WorkedHourItem item={x}/> )}
          </List>
        </Segment>       
      </Segment.Group>
    </div>
   );
});
