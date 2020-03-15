import React, { useCallback } from "./node_modules/react";
import "./WorkedHourItem.css";
import { Card, Form, Input } from "./node_modules/semantic-ui-react";
import { observer } from "./node_modules/mobx-react-lite";
import moment from "./node_modules/moment-timezone";

/**
 * Worked Hour Item
 */
 export default observer( (props) => {
  const onChange = useCallback(
    (e) => props.store.setHour({...props.item, hours: e.target.value}),
    [props.store, props.item]
  );

  const color = props.item.error ? 'red' : props.item.hours == 0 ? 'yellow' : 'blue';
  const error = props.item.error || null;
  const editable = props.item.hours !== undefined;
  const date = moment(props.item.day.substr(0,10));
  const day = date.day();
  const isWeekEnd = day === 0 || day === 6;

  return (
    <Card color={editable ? color : null} className={isWeekEnd ? 'weekend' : null}>
      <Card.Content>
        <Card.Header className={editable ? null : 'light-grey'}>{date.date()}</Card.Header>
        <Card.Meta>{date.format('dddd')}</Card.Meta>
      </Card.Content>
        {editable && (
          <Card.Content extra>
            <Form>
              <Form.Field
                fluid
                control={Input}
                type="number"
                min={0}
                max={24}
                size='large'
                transparent
                align="right"
                onChange={onChange}
                value={props.item.hours}
                error={error}
              />
            </Form>
          </Card.Content>
        )}
    </Card>
  )});