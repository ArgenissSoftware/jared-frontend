import React, { useEffect } from "react";
import { observer, useLocalStore } from "mobx-react-lite";
import {
  List,
  Header,
  Divider,
  Dimmer,
  Loader,
  Pagination,
  Container,
  Grid,
  Form,
  Icon
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

  return (
    <div className="ui container aligned">
      <Header as="h3" icon="user" content={props.title} />
      <Divider />
      <Dimmer active={store.loading} inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Form>
              <Form.Group>
                <Form.Input
                  type="search"
                  placeholder="Search"
                  icon={<Icon name='search' inverted circular link />}
                  onChange={store.setSearch}
                />
              </Form.Group>
            </Form>
          </Grid.Column>
          <Grid.Column>
            {props.toolbar}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <List divided relaxed verticalAlign='middle' size='large'>
        {store.list.map( props.renderItem )}
      </List>
      <Container>
        <Grid>
          <Grid.Row>
            <PageSizeSelector
              pageSizeOptions={store.pageSizeOptions}
              pageSize={store.pageSize}
              onChange={store.setPageSize}
            />
          </Grid.Row>
          <Grid.Row centered>
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
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
});