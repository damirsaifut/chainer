import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_DEV = 'url';
const API_TEST = 'url';
let url;

if (process.env.NODE_ENV === 'production') {
  url = window.location.origin + '/api';
  // url = API_DEV;
} else if (process.env.NODE_ENV === 'development') {
  url = API_DEV;
}

const API_URL = url;

const Api = props => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [head, setHead] = useState('');
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [queryResult, setQueryResult] = useState('');

  function handleSendButton() {
    evFetchData(query);
  }

  useEffect(() => {
    if (props.location.state) {
      const header = props.location.state.header;
      let query = JSON.stringify(props.location.state.query);
      setHead(header);
      setQuery(query);
    }
  }, []);

  function setStateFromInputHead(event) {
    var obj = {};
    obj[event.target.name] = event.target.value;
    setHead(obj[event.target.name]);
  }

  function setStateFromInputQuery(event) {
    var obj = {};
    obj[event.target.name] = event.target.value;
    setQuery(obj[event.target.name]);
  }

  async function evFetchData(query) {
    setIsLoading(true);

    let data = {};

    try {
      data = JSON.parse(query);
      const res = await axios({
        baseURL: API_URL,
        method: 'POST',
        timeout: 15000,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      });

      if (res.status !== 200) throw res.data;
      if (res.data.error) throw res.data.error;

      setResult(res.data.result);
    } catch (e) {
      setError(e);
      setQueryResult(' Неправильный запрос');
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <div className="spinner" />;
  }

  return (
    <div className="api-form">
      <div className="row">
        <div className="col col-sm-24 col-md-24 col-lg-12 api-form__wrapper">
          <div className="api-form__code-from">
            <div className="panel-heading">
              <h4 className="panel-title" role="presentation">
                <a aria-expanded="true" aria-selected="true">
                  Request editor
                </a>
              </h4>
            </div>
            <form className="api_form">
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <code>e</code>
                  </span>
                  <input
                    type="text"
                    placeholder="Event"
                    id="formControlsEvent"
                    className="form-control"
                    name="head"
                    value={head}
                    onChange={setStateFromInputHead}
                  />
                </div>
              </div>
              <div className="form-group has-success">
                <label className="control-label">Payload</label>
                <textarea
                  placeholder="Edit payload here..."
                  rows="15"
                  id="formControlsTextarea"
                  className="form-textarea"
                  name="query"
                  value={query}
                  onChange={setStateFromInputQuery}
                />
              </div>
              <hr />
              <button
                type="button"
                className="btn btn-info"
                onClick={handleSendButton}
              >
                Send
              </button>
            </form>
          </div>
        </div>
        <div className="col col-sm-24 col-md-24 col-lg-12 api-form__wrapper">
          <div className="panel-heading">
            <h4 role="presentation" className="panel-title">
              <a aria-expanded="true" aria-selected="true">
                Console
              </a>
            </h4>
          </div>
          <form className="api_form">
            <div className="form-group has-success">
              <textarea
                disabled="disabled"
                placeholder="Edit payload here..."
                rows="15"
                id="formControlsTextarea"
                className="textarea form-textarea form-textarea--disabled"
                value={
                  result
                    ? JSON.stringify(result, '', 4)
                    : JSON.stringify(error, '', 4) + queryResult
                }
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Api;
