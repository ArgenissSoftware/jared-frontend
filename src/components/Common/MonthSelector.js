import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const months = [
  {
		"key": "Jan",
    "text": "January",
    "value": 1
	},
	{
		"key": "Feb",
    "text": "February",
    "value": 2
	},
	{
		"key": "Mar",
    "text": "March",
    "value": 3
	},
	{
		"key": "Apr",
    "text": "April",
    "value": 4
	},
	{
		"key": "May",
    "text": "May",
    "value": 5
	},
	{
		"key": "Jun",
    "text": "June",
    "value": 6
	},
	{
		"key": "Jul",
    "text": "July",
    "value": 7
	},
	{
		"key": "Aug",
    "text": "August",
    "value": 8
	},
	{
		"key": "Sep",
    "text": "September",
    "value": 9
	},
	{
		"key": "Oct",
    "text": "October",
    "value": 10
	},
	{
		"key": "Nov",
    "text": "November",
    "value": 11
	},
	{
		"key": "Dec",
    "text": "December",
    "value": 12
	}
]

export default function(props) {
  return (
    <Dropdown
			selection
      placeholder='Select month'
      options={months}
      {...props}
    />
  )
}