import React, { useEffect } from "react";
import _ from 'lodash';
import { useLocalStore, observer } from "mobx-react-lite";
import WorkedHoursService from "../../services/workedHours.service";
import { useAuthStore } from "../../stores/AuthStore";
import { Segment, List, Header } from "semantic-ui-react";
import WorkedHourItem from "./WorkedHourItem";
import moment from "moment";

/**
 *worked hour List Component
 * @param {Object} props
 */

export default observer((props) => {


  const authStore = useAuthStore();
  let selectedDate = moment('2015/11');
  let arrayofcards = [];

  //filling the array of cards with the selectedDate
  for (let i = 0; i < selectedDate.daysInMonth(); i++) {
    arrayofcards.push(<div className="card">
      <div className="content">
        <div className="header">{selectedDate.format('dddd')} {selectedDate.date()}</div>
        <div className="description">
          {selectedDate.date()}
        </div>
        <div className="body"> W H I placeholder </div>

      </div>
      <div className="ui bottom attached button">
        <i className="add icon" />
        {selectedDate.date()}
      </div>
    </div>)
    if (selectedDate.date() < selectedDate.daysInMonth())
      selectedDate.add(1, 'day');
  }


  const localStore = useLocalStore(() => ({
    list: [],
    setList(value) {
      this.list = value;
    },
    async getList() {
      const response = await WorkedHoursService.getHours(authStore.user._id, '5de7ba685a461b008ca4da09', selectedDate.year(), selectedDate.month());
      let auxArray = [];
      selectedDate.startOf('month');
      for (let i = 0; i < selectedDate.daysInMonth(); i++) {
       if(selectedDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]') === response.data.data.list[i].day)

        selectedDate.add(1, 'day');
      }
      this.setList(response.data.data.list);
    }
  }));

  useEffect(() => {
    localStore.getList();
  }, []);



  return (

    <div className="ui container aligned">
      <Header as="h3" icon="clock outline" content={`Worked Hours of ${selectedDate.format('MMMM')}`} />
      <Segment.Group>
        <Segment attached color="blue" >
          <div className="ui container center aligned">
            <div className="ui seven cards ">
              {arrayofcards.map(x => x)}
            </div>
          </div>
        </Segment>
      </Segment.Group> { localStore.list.map( (x)=>  
      <div>
      <WorkedHourItem item={x}/> + {selectedDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')}
       </div>)} 
      
    </div>
   
  );
});
