import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Meme Stream",
      act: 0,
      index: "",
      datas: [],
      list: [],
    };
  }

  componentDidMount() {
    this.refs.name.focus();
    axios.get("https://memestreams.herokuapp.com/memes").then((res) => {
      console.log(res.data);
      this.setState({ list: res.data });
    });
  }

  fSubmit = (e) => {
    e.preventDefault();
    console.log("try");

    let datas = this.state.list;
    let name = this.refs.name.value;
    let caption = this.refs.caption.value;
    let url = this.refs.url.value;

    let data = {
      name: name,
      caption: caption,
      url: url,
    };

    if (this.state.act === 0) {
      //new

      const header = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
      };
      const headers = { "Access-Control-Allow-Origin": "*" };

      axios
        .post("https://memestreams.herokuapp.com/memes", data)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          this.setState((previousState) => ({
            list: [res.data, ...previousState.list],
          }));
        });
    } else {
      //update

      let index = this.state.index;
      datas[index].MemeOwner = name;
      datas[index].MemeCaption = caption;
      datas[index].MemeUrl = url;
    }
    console.log(datas);
    this.setState({
      datas: datas,
      act: 0,
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  };

  fRemove = (i) => {
    //delete
    console.log("in del");
    const list = this.state.list;
    const data = this.state.list[i];
    // console.log(data);
    const id = data._id;
    // console.log(i);

    axios
      .delete("https://memestreams.herokuapp.com/memes/" + id, data)
      .then((res) => {
        list.splice(i, 1);
        this.setState({
          datas: list,
        });
      });
    console.log("after del", list);

    this.refs.myForm.reset();
    this.refs.name.focus();
  };

  fEdit = (i) => {
    //edit
    let data = this.state.list[i];
    const id = data._id;
    axios
      .patch("https://memestreams.herokuapp.com/memes/" + id, data)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        this.refs.name.value = data.MemeOwner;
        this.refs.caption.value = data.MemeCaption;
        this.refs.url.value = data.MemeUrl;
        this.setState({
          act: 1,
          index: i,
        });
      });

    this.refs.name.focus();
  };

  render() {
    let datas = this.state.datas;

    return (
      <div className="App">
        <div class="fixed">
          <h1 class="mb-4 center">{this.state.title}</h1>

          <div class="container">
            <form ref="myForm" className="myForm ">
              <div class="form-group">
                <label for="name">Meme Owner</label>
                <input
                  type="text"
                  ref="name"
                  placeholder="Enter your full name"
                  className="form-control"
                />
              </div>
              <div class="form-group">
                <label for="caption">Meme Caption</label>
                <input
                  type="text"
                  ref="caption"
                  placeholder="Be innovative with your caption"
                  className="form-control"
                />
              </div>
              <div class="form-group">
                <label for="url">Meme URL</label>
                <input
                  required
                  type="text"
                  ref="url"
                  placeholder="Enter URL of meme"
                  className="form-control"
                />
              </div>
              <button
                onClick={(e) => this.fSubmit(e)}
                className="btn btn-primary"
              >
                Submit Meme{" "}
              </button>
              <hr></hr>
            </form>
          </div>
        </div>
        <div class="cards">
          {this.state.list.map((data, i) => (
            <div class="container ">
              <div class="Meme-card ">
                <div key={i}>
                  <h4 class="Meme-card-header">{data.MemeOwner}</h4>
                  <div class="Meme-card-header"> {data.MemeCaption}</div>
                  <div class="card-text mb-2 mx ">
                    <img class="Meme-card-img " src={data.MemeUrl} />
                  </div>
                  <div class="d-inline  mb-4 Meme-card-footer">
                    <button
                      onClick={() => this.fEdit(i)}
                      className="btn btn-info mx"
                    >
                      Edit{" "}
                    </button>
                    <button
                      class="d-inline"
                      onClick={() => this.fRemove(i)}
                      className="btn btn-danger mx "
                    >
                      Delete{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
