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
  
  const localStore = useLocalStore(() => ({
    list: [],
    setList(value) {
      this.list = value;
    },
    async getList() {
      const response = await WorkedHoursService.getHours(authStore.user._id, '5de7ba685a461b008ca4da09', selectedDate.year(), selectedDate.month());
      let auxArray = [];

      let auxIndex = 0;
      let auxBoolean = false;

      selectedDate.startOf('month');
      for (let i = 0; i < selectedDate.daysInMonth(); i++) {
        for (let j = 0; j < response.data.data.list.length; j++) {
          if (selectedDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]') === response.data.data.list[j].day) {
            auxBoolean = true;
            auxIndex = j;
            break;
          }
        }
        if (auxBoolean) {
          auxArray.push(response.data.data.list[auxIndex]);
        } else {
          auxArray.push({
            day: selectedDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
            hours: 0,
            clientId: '',
            userId: ''
          });
        }
        auxBoolean = false;
        if (selectedDate.date() < selectedDate.daysInMonth())
          selectedDate.add(1, 'day');
      }
      this.setList(auxArray);
    }
  }));

  useEffect(() => {
    localStore.getList();
  }, []);



  return (
    <div className="ui container aligned">
      <Header as="h3" icon="clock outline" content={`Worked Hours of ${selectedDate.format('MMMM')} ${selectedDate.year()}`} />
      <Segment.Group>
        <Segment attached color="blue" >
          <div className="ui container center aligned">
            <div className="ui seven cards">
              {localStore.list.map(whitem => {
                return(
                <div className="card">
                <div className="content">
                  <div className="header">{new moment(whitem.day).add('hour',3).format('dddd')} </div>
                  <div className="description">{new moment(whitem.day).add('hour',3).date()}</div>
                  <div className="body">                                    
                          <WorkedHourItem item={whitem} />
                  </div>
                </div>
                 
                </div>
              )
              })}
            </div>
          </div>
        </Segment>
      </Segment.Group>
    </div>
  );
});

