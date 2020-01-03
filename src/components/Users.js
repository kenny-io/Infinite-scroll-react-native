import React, {Component} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {Card} from 'react-native-elements';
import axios from 'axios';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      page: 1,
      error: null,
    };
  }
  componentDidMount() {
    this.fetchUsers(this.state.page);
  }

  fetchMoreUsers = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 100,
      }),
      () => {
        this.fetchUsers();
      },
    );
  };

  fetchUsers = () => {
    const {page} = this.state;
    axios
      .get(`https://api.github.com/users?since=${page}&per_page=10`)
      .then(response => {
        this.setState({
          users: this.state.users.concat(response.data),
        });
      })
      .catch(error => {
        this.setState({error: error});
      });
  };

  render() {
    return (
      <FlatList
        contentContainerStyle={{
          backgroundColor: '#FBFBF8',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 15,
        }}
        data={this.state.users}
        keyExtractor={user => user.id.toString()}
        onEndReached={this.fetchMoreUsers}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        renderItem={({item}) => (
          <View
            style={{
              marginTop: 10,
            }}>
            <Card>
              <Image
                style={{width: 200, height: 100}}
                source={{uri: item.avatar_url}}
              />
              <Text>{item.login}</Text>
            </Card>
          </View>
        )}
      />
    );
  }
}
export default Users;
