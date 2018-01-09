import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, FlatList, Platform, StatusBar, TouchableOpacity, ToolbarAndroid,ViewPagerAndroid } from 'react-native';
import { StackNavigator } from 'react-navigation';


var ScrollableTabView = require('react-native-scrollable-tab-view');

class MyListItem extends React.PureComponent {

  render() {
    const textColor = this.props.selected ? "red" : "black";
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <Text style={{ color: textColor }}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

/* サンプルデータ */
const mathematics = [
  { key: '1', title: 'カフェオレ', image:'https://katsuma0501.github.io/1_cafeaula.jpg', detail: 'コーヒーにスチームドミルク（温めたミルク）を入れる。分量はコーヒー1:スチームドミルク1が目安。コーヒーはレギュラーコーヒーを使用。浅煎りの豆がおすすめ。' },
  { key: '2', title: 'カフェラテ',  image:'https://katsuma0501.github.io/2_cafelate.jpg',detail: 'エスプレッソにスチームドミルク（温めたミルク）を入れる。分量はエスプレッソ1:スチームドミルク4が目安。コーヒーはエスプレッソを使用。深煎りの豆がおすすめ。' },
  { key: '3', title: 'カプチーノ', image:'https://katsuma0501.github.io/3_cappuccino.jpg', detail: 'エスプレッソに泡立てたミルクを入れる。分量は、エスプレッソ3：スチームミルク3：フォームミルク４が目安' },
  { key: '4', title: 'ウィンナーコーヒー', image:'https://katsuma0501.github.io/4_winner.jpg', detail: 'コーヒーにホイップクリームを浮かべる。コーヒーの表面全体をホイップクリームで覆うように浮かべるのがおすすめ。お好みでカカオシュガーなどを上からかけてもおいしい。' },
  { key: '5', title: 'エスプレッソ', image:'https://katsuma0501.github.io/5_esspresso.jpg', detail: '深煎りの豆を加圧抽出していれる。エスプレッソマシンやモカエキスプレスなどを使用する。' },
  { key: '6', title: 'マキアート', image:'https://katsuma0501.github.io/6_makiart.jpg', detail: '1ショットのエスプレッソに少量のフォームドミルクを入れる。イタリア語で｢染みのついた｣と言う意味。' },
  { key: '7', title: 'カフェオレ', image:'https://katsuma0501.github.io/1_cafeaula.jpg', detail: 'コーヒーにスチームドミルク（温めたミルク）を入れる。分量はコーヒー1:スチームドミルク1が目安。コーヒーはレギュラーコーヒーを使用。浅煎りの豆がおすすめ。' },
  { key: '8', title: 'カフェラテ',  image:'https://katsuma0501.github.io/2_cafelate.jpg',detail: 'エスプレッソにスチームドミルク（温めたミルク）を入れる。分量はエスプレッソ1:スチームドミルク4が目安。コーヒーはエスプレッソを使用。深煎りの豆がおすすめ。' },
  { key: '9', title: 'カプチーノ', image:'https://katsuma0501.github.io/3_cappuccino.jpg', detail: 'エスプレッソに泡立てたミルクを入れる。分量は、エスプレッソ3：スチームミルク3：フォームミルク４が目安' },
  { key: '10', title: 'ウィンナーコーヒー', image:'https://katsuma0501.github.io/4_winner.jpg', detail: 'コーヒーにホイップクリームを浮かべる。コーヒーの表面全体をホイップクリームで覆うように浮かべるのがおすすめ。お好みでカカオシュガーなどを上からかけてもおいしい。' },
  { key: '11', title: 'エスプレッソ', image:'https://katsuma0501.github.io/5_esspresso.jpg', detail: '深煎りの豆を加圧抽出していれる。エスプレッソマシンやモカエキスプレスなどを使用する。' },
  { key: '12', title: 'マキアート', image:'https://katsuma0501.github.io/6_makiart.jpg', detail: '1ショットのエスプレッソに少量のフォームドミルクを入れる。イタリア語で｢染みのついた｣と言う意味。' }
];

/*
 * データのタイトルをリスト表示するコンポーネント
 * ナビゲーターで描画すると引数(props)に`navigation`が渡される
 */
const ListScreen = ({ navigation }) => (
  <ScrollView>
      <FlatList
        data={mathematics}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.key}
            style={{ flex: 1, margin: 5, backgroundColor: '#ddd', height: 130}}
            /* タイトルが押されたら詳細画面にナビゲート、`item`を引数として渡している */
            onPress={() => navigation.navigate('Detail', item)}
          >
            <View style={{ flex: 1,backgroundColor: 'white', margin: 1, height: 200, borderRadius: 2, overflow: 'hidden' }}>
              <Image source={{uri: item.image}} style={{ flex: 1, height: 50 }}/>
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 5 }}>{item.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.container}
      />
  </ScrollView>
);
/* ナビゲーションの見た目や挙動に関する設定 */
ListScreen.navigationOptions = () => ({
  /* 画面ヘッダーに表示するタイトルを'Mathematics'にする */
  title: 'おうちコーヒーレシピ',
  headerStyle : {
    marginTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
  },
  headerTintColor : '#000'
});

// データの詳細を表示するコンポーネント
const DetailScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Image source={{uri: navigation.state.params.image}} style={{ flex: 1 }}/>
    {/* `navigation.state.params`からリストで渡した`item`の中身が取れる */}
    <Text style={[styles.heading, { marginBottom: 24 }]}>{navigation.state.params.title}</Text>
    <Text style={styles.paragraph}>{navigation.state.params.detail}</Text>
  </View>
);
DetailScreen.navigationOptions = {
  title: 'レシピ',
  headerStyle : {
    marginTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
  },
  headerTintColor : '#000'
};

/*
 * StackNavigatorを作成
 * 第一引数は登録する画面(Screen)情報を設定
 * 第二引数はオプション、初期表示画面を設定
 */
export default StackNavigator({
  Detail: { screen: DetailScreen },
  List: { screen: ListScreen },
}, {
  initialRouteName: 'List',
});
/*
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
          {
            id:1,
            key: '1',
            name: 'カフェオレ'
          }
        , {
            id:2,
            key: '2',
            name: 'カプチーノ'
          }
          , {
            id:2,
            key: '2',
            name: 'カプチーノ'
          }
          , {
            id:2,
            key: '2',
            name: 'カプチーノ'
          }
          , {
            id:2,
            key: '2',
            name: 'カプチーノ'
          }
          , {
            id:2,
            key: '2',
            name: 'カプチーノ'
          }
          , {
            id:2,
            key: '2',
            name: 'カプチーノ'
          }
          , {
            id:2,
            key: '2',
            name: 'カプチーノ'
          }
          , {
            id:2,
            key: '2',
            name: 'カプチーノ'
          }
          , {
            id:2,
            key: '2',
            name: 'カプチーノ'
          }
          , {
            id:2,
            key: '2',
            name: 'カプチーノ'
          }
          , {
            id:2,
            key: '2',
            name: 'カプチーノ'
          }
          , {
            id:2,
            key: '2',
            name: 'カプチーノ'
          }
          , {
            id:2,
            key: '2',
            name: 'カプチーノ'
          }
          , {
            id:2,
            key: '2',
            name: 'カプチーノ'
          }
          , {
            id:2,
            key: '2',
            name: 'カプチーノ'
          }
          , {
            id:2,
            key: '2',
            name: 'カプチーノ'
          }
          , {
            id:2,
            key: '2',
            name: 'カプチーノ'
          }
          , {
            id:2,
            key: '2',
            name: 'カプチーノ'
          }
      ]
    }
  }

  _renderItem = ({item}) => (
    <TouchableOpacity>
      <View style={styles.listItem}>
        <Text style={styles.itemText}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={{
        flex:1,
        paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
        <ToolbarAndroid
        title="おうちコーヒーレシピ"
        titleColor="#ffffff"
        style={styles.toolbar} />
        <ScrollableTabView style={styles.tabView}>
          <View tabLabel='レシピ' style={styles.tabLabel}>
            <FlatList
              data={this.state.data}
              renderItem={this._renderItem}
            />
          </View>
          <View tabLabel='Tab #2' style={styles.tabLabel}>
              <ViewPagerAndroid
              style={styles.viewPager}
              initialPage={0}>
              <View style={styles.pageStyle} key="1">
                <Text>First page</Text>
              </View>
              <View style={styles.pageStyle} key="2">
                <Text>Second page</Text>
              </View>
            </ViewPagerAndroid>
          </View>
          <Text tabLabel='Tab #3' style={styles.tabLabel}>project</Text>
        </ScrollableTabView>
      </View>
    );
  }
}
*/

const styles = StyleSheet.create({
  toolbar: {
    height: 56,
    backgroundColor:'#27ae60'
  },
  tabLabel: {
    backgroundColor:'#ffffff'
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#27ae60'
  },
  itemText: {
    fontSize: 22,
    margin: 10,
  },
  viewPager: {
    flex: 1
  },
  pageStyle: {
    alignItems: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    color: 'rgba(14, 13, 13, .38)',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10
  },
  paragraph: {
    fontSize: 18,
    color: '#737373',
  }
});