import React, {Component} from 'react';
import {ScrollView, View, Text, FlatList, Image} from 'react-native';
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
  fetchUsers = page => {
    axios
      .get(`https://api.github.com/users?since=${page}&per_page=10`)
      .then(response => {
        this.setState(() => ({
          users:
            page === 1
              ? Array.from(response.data)
              : [...this.state.users, ...response.data],
        }));
      })
      .catch(error => {
        this.setState({error: error});
      });
  };
  componentDidMount() {
    this.fetchUsers(this.state.page);
  }
  render() {
    return (
      <ScrollView>
        <FlatList
          contentContainerStyle={{
            flex: 1,
            backgroundColor: '#FBFBF8',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 15,
          }}
          data={this.state.users}
          keyExtractor={user => user.id.toString()}
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
      </ScrollView>
    );
  }
}

export default Users;
