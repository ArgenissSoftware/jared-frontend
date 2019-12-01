import React, { useEffect } from "react";
import { observer, useLocalStore } from "mobx-react-lite";
import {
  List,
  Header,
  Segment,
  Dimmer,
  Loader,
  Pagination,
  Placeholder,
  Menu,
  Input,
} from "semantic-ui-react";

import PageSizeSelector from './PageSizeSelector';
import { createListStore } from "../../stores/CreateListStore";

/**
 * Entity List Component
 */
export default observer((props) => {

  const store = useLocalStore(createListStore(props.service));

  useEffect(() => {
    store.loadPage();
  }, []);

  const body = (store.list.length === 0 && store.loading) ? (
    <Placeholder>
      <Placeholder.Header image>
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Header>
    </Placeholder>
    ) : store.list.map( props.renderItem );

  return (
    <div className="ui container aligned">
      <Header as="h3" icon="user" content={props.title} />

      <Segment.Group>
        <Menu attached="top">
          {props.toolbar}
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' onChange={store.setSearch} />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Segment attached color="blue" >
          <List divided relaxed verticalAlign='middle' size='large'>
            {store.loading && <Dimmer active={store.loading} inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>}

            {body}
          </List>
        </Segment>
        <Segment attached textAlign='right' basic>
          <PageSizeSelector
            pageSizeOptions={store.pageSizeOptions}
            pageSize={store.pageSize}
            onChange={store.setPageSize}
          />
        </Segment>
        <Segment attached textAlign='center'>
          <Pagination
            type="pagination"
            activePage={store.page}
            firstItem={null}
            lastItem={null}
            pointing
            secondary
            totalPages={store.count / store.pageSize}
            onPageChange={store.setPage}
          />
        </Segment>
      </Segment.Group>
    </div>
  );
});