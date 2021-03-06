// @flow

import React, { Component } from 'react';
import {
  Image,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Footer,
  FooterTab,
  Text,
  Thumbnail,
} from 'native-base';
import HTMLView from 'react-native-htmlview';
import Formatter from 'chinese-datetime-formatter';

import Actions from '../Actions/Creators';
import LoginScreen from './LoginScreen';

class ActivityScreen extends Component {
  static navigationOptions = {
    title: '活动详情',
  };

  state: {
    dataset: {
      act_title: string;
      act_date: string;
      act_desc: string;
      course_name: string;
      title_pic: string;
    };
    isLoading: boolean;
    showModal: boolean;
  };
  closeModal: Function;

  constructor() {
    super();
    this.state = {
      dataset: {
        act_title: '',
        act_date: '<Text></Text>',
        act_desc: '',
        course_name: '<Text></Text>',
        title_pic: '',
      },
      isLoading: true,
      showModal: false,
    };
    this.closeModal = this.closeModal.bind(this);
  }

  async getActivity(act_id: any) {
    this.props.attemptGetActivity(act_id);
  }

  componentWillMount() {
    this.getActivity(this.props.navigation.state.params.act_id);
  }

  setActUser(act_id, direction) {
    if (this.props.login == null) {
      // 如果本地没有存储用户信息，则错误，弹出登录页面
      this.setState({showModal: true});
    } else {
      this.props.attemptSetActUser(act_id, direction);
    }
  }

  closeModal() {
    this.setState({showModal: false});
  }

  render() {
    const item = this.props.activity;
    const actusers = this.props.actusers;
    return (
      <Container>
        <Content padder>
          {this.state.showModal && (<LoginScreen navigation={this.props.navigation} visible={this.state.showModal} closeme={this.closeModal} />)}
          <Card style={{ flex: 0 }}>
            <CardItem cardBody>
              <Image
                style={{ resizeMode: 'cover', width: null, height: 150, flex: 1 }}
                source={{uri: item.title_pic == undefined ? 'https://wx.weinnovators.com/images/title_pic_01.jpg' : `https://img.weinnovators.com/accimages/${item.title_pic}.jpg`}}
              />
            </CardItem>
            <CardItem>
              <Body>
                <Text>{item.act_title.replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”')}</Text>
                <Text note>{Formatter(item.act_date, 'yyyy-MM-dd')}</Text>
                <Text note>{item.course_name}</Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Text>活动简介</Text>
            </CardItem>
            <CardItem>
              <Body>
                <HTMLView value={item.act_desc} />
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Text>参会人员</Text>
            </CardItem>
            <CardItem>
              <Body style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                {actusers && actusers.map(actuser => (
                  <View key={actuser.user_id} style={{width: 80, justifyContent: 'center', alignItems: 'center'}}>
                    <Thumbnail size={80} source={{uri: (actuser.avatar ? `https://img.weinnovators.com/wxavatars/${actuser.user_id}.jpg` : 'https://www.wecan.tv/overlay-default.png')}} />
                    <Text style={{textAlign: 'center'}}>{actuser.wx_username}</Text>
                  </View>
                ))}
              </Body>
            </CardItem>
          </Card>
        </Content>
        <Footer>
          <FooterTab>
            {this.props.hasme && (
            <Button full danger onPress={() => this.setActUser(item.act_id, 0)}>
              <Text style={{color: '#FFFFFF'}}>取消报名</Text>
            </Button>
            )}
            {!this.props.hasme && (
            <Button full success onPress={() => this.setActUser(item.act_id, 1)}>
              <Text style={{color: '#FFFFFF'}}>我要报名</Text>
            </Button>
            )}
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login.login,
    activity: state.activity.activity,
    actusers: state.activity.actusers,
    hasme: state.activity.hasme,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptGetActivity: (id) => dispatch(Actions.activityRequest(id)),
    attemptSetActUser: (id, direction) => dispatch(Actions.setActUserRequest(id, direction)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityScreen);
