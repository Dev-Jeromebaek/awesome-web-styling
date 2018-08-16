import React, { Component } from 'react';

class ErrorPage extends Component {
  render() {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100%', width: '100%' }}
      >
        <div role="main" style={{ margin: '0', padding: '0' }}>
          <div
            style={{
              width: '590px',
              margin: '0 auto',
              padding: '0',
              minHeight: '100%',
            }}
          >
            <div
              style={{
                padding: '100px 0 0px',
                background:
                  'url(//t1.daumcdn.net/tistory_admin/static/top/bg_error.gif) no-repeat 50% 30px',
                textAlign: 'center',
              }}
            >
              <h3
                style={{
                  fontSize: '18px',
                  lineHeight: '32px',
                  color: '#333',
                  letterSpacing: '-1px',
                }}
              >
                데이터 갱신중입니다.
              </h3>
              <div
                style={{
                  width: '550px',
                  padding: '15px 10px',
                  margin: '30px auto 0',
                  fontSize: '13px',
                  lineHeight: '24px',
                  color: '#919191',
                  // backgroundColor: '#fafafa',
                  letterSpacing: '-1px',
                }}
              >
                잠시 후 다시 시도해 주세요.
                <br />
                최대 10분이 소요될 수 있습니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorPage;
