import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
// import {
//   Pagination as Paging,
//   PaginationItem,
//   PaginationLink,
// } from 'reactstrap';

export class Pagination extends Component {
  // state = {
  //   nowPage: this.props.pageNum, // 보고자 하는 선택된 페이지번호
  //   startPage: 1, // 전체 글에 대한 첫 페이지 숫자(1)
  //   endPage: '', // 전체 글에 대한 마지막 페이지 숫자
  //   recordDegree: 10, // 페이지당 보여줄 글 수
  //   countAllRecord: this.props.totalSize, // 전체 글 갯수0
  //   startNum: '', // 하나의 페이지에서 시작되는 글번호
  //   endNum: '', // 하나의 페이지에서 끝나는 글번호
  //   showPageNumberDegree: 5, // 페이지 당 보여줄 선택권
  //   showPageNumberBegin: '', // 페이지 당 노출할 페이지숫자 시작번호
  //   showPageNumberEnd: '', // 페이지 당 노출할 페이지숫자 끝번호
  // };
  //	페이지 당 보여줄 글(recordDegree) 수 설정에 따른 값의 계산
  //	- 5개로 설정한 경우
  //		현재 1페이지(nowPage) => 1번글 ~ 5번글
  //		현재 2페이지(nowPage) => 6번글 ~ 10번글
  //		현재 3페이지(nowPage) => 11번글 ~ 15번글
  //	- 선택된 페이지의 시작 글번호(startNum)
  //		startNum = (pageNum*recordDegree)-(recordDegree-1)
  //	- 선택된 페이지의 끝 글번호(endNum)
  //		endNum = (pageNum*recordDegree)
  //		=> 단, 전체글 갯수가 끝번호보다 작은 경우,
  //			endNum=전체글 갯수

  //	전체 글에 대한 마지막 페이지(endPage) 계산
  //	=> 전체글 / 페이지당 보여줄 글 수(recordDegree)
  //		단, 전체글 갯수 % 페이지당 보여줄 글 수의 결과가 0이 아니면
  //		(전체글 / 페이지당 보여줄 글 수) + 1

  // componentDidMount() {
  //   //   console.log(nowPage);
  //   const { pageNum, totalSize } = this.props;
  //   let nowPage = pageNum;
  //   let startPage = 1;
  //   let endPage = '';
  //   let recordDegree = 10;
  //   let countAllRecord = totalSize;
  //   let countPage = totalSize / recordDegree + 1;
  //   let showPageNumberDegree = countPage > 5 ? 5 : countPage;
  //   let showPageNumberBegin = '';
  //   let showPageNumberEnd = '';

  //   // 선택된 페이지에서 보여줄 글의 시작과 끝 번호 계산
  //   // console.log(
  //   //   '현재 페이지에서 보여줘야 할 레코드의 시작/끝 : ' +
  //   //     startNum +
  //   //     ', ' +
  //   //     endNum,
  //   // );
  //   // 전체 레코드에 대한 페이징 숫자 설정
  //   endPage = Math.floor(totalSize / recordDegree);
  //   if (totalSize % recordDegree != 0) endPage++;
  //   showPageNumberBegin = Math.floor(nowPage - (showPageNumberDegree - 1) / 2);
  //   showPageNumberEnd = Math.floor(nowPage + (showPageNumberDegree - 1) / 2);

  //   if (showPageNumberEnd > endPage) {
  //     showPageNumberEnd = endPage;
  //     showPageNumberBegin = showPageNumberEnd - showPageNumberDegree + 1;
  //   }
  //   if (showPageNumberBegin < 1) {
  //     showPageNumberBegin = 1;
  //     showPageNumberEnd = showPageNumberDegree;
  //     if (recordDegree * showPageNumberDegree > countAllRecord) {
  //       showPageNumberEnd = endPage;
  //     }
  //   }
  //   console.log(nowPage);
  //   console.log(startPage);
  //   console.log(endPage);
  //   console.log(recordDegree);
  //   console.log(countAllRecord);
  //   console.log(countPage);
  //   console.log(showPageNumberDegree);
  //   console.log(showPageNumberBegin);
  //   console.log(showPageNumberEnd);
  //   //   startNum = nowPage * recordDegree - (recordDegree - 1);
  //   //   endNum = nowPage * recordDegree;
  //   //   if (endNum > countAllRecord) {
  //   //     endNum = countAllRecord;
  //   //   }
  //   //   console.log(
  //   //     '현재 페이지에서 보여줘야 할 레코드의 시작/끝 : ' +
  //   //       startNum +
  //   //       ', ' +
  //   //       endNum,
  //   //   );
  //   //   // 전체 레코드에 대한 페이징 숫자 설정
  //   //   startPage = 1;
  //   //   endPage = countAllRecord / recordDegree;
  //   //   if (countAllRecord % recordDegree != 0) {
  //   //     endPage++;
  //   //   }
  //   //   showPageNumberBegin = nowPage - (showPageNumberDegree - 1) / 2;
  //   //   showPageNumberEnd = nowPage + (showPageNumberDegree - 1) / 2;
  //   //   if (showPageNumberEnd > endPage) {
  //   //     showPageNumberEnd = endPage;
  //   //     showPageNumberBegin = showPageNumberEnd - showPageNumberDegree + 1;
  //   //   }
  //   //   if (showPageNumberBegin < 1) {
  //   //     showPageNumberBegin = 1;
  //   //     showPageNumberEnd = showPageNumberDegree;
  //   //     if (recordDegree * showPageNumberDegree > countAllRecord) {
  //   //       showPageNumberEnd = endPage;
  //   //     }
  //   //   }
  //   //   this.setState({
  //   //     nowPage: nowPage,
  //   //     startPage: startPage,
  //   //     endPage: endPage,
  //   //     recordDegree: recordDegree,
  //   //     countAllRecord: countAllRecord,
  //   //     startNum: startNum,
  //   //     endNum: endNum,
  //   //     showPageNumberDegree: showPageNumberDegree,
  //   //     showPageNumberBegin: showPageNumberBegin,
  //   //     showPageNumberEnd: showPageNumberEnd,
  //   //   });
  // }
  // prevPage = () => {
  //   return '?page=' + (this.props.pageNum - 1);
  // };

  // nextPage = () => {
  //   return '?page=' + (this.props.pageNum + 1);
  // };

  render() {
    // console.log(this.props);
    // console.log(this.props.totalSize);
    // console.log(this.props.pageNum);
    return;
    // <Paging
    //   aria-label="Page navigation"
    //   style={{ margin: '10px auto' }}
    //   className="d-flex justify-content-center"
    // >
    //   <PaginationItem>
    //     <NavLink to={this.prevPage()} className="page-link">
    //       ◀
    //     </NavLink>
    //   </PaginationItem>
    //   <PaginationItem active>
    //     <NavLink to="?page=1" className="page-link">
    //       1
    //     </NavLink>
    //   </PaginationItem>
    //   <PaginationItem>
    //     <NavLink to="?page=2" className="page-link">
    //       2
    //     </NavLink>
    //   </PaginationItem>
    //   <PaginationItem>
    //     <NavLink to="?page=3" className="page-link">
    //       3
    //     </NavLink>
    //   </PaginationItem>
    //   <PaginationItem>
    //     <NavLink to="?page=4" className="page-link">
    //       4
    //     </NavLink>
    //   </PaginationItem>
    //   <PaginationItem>
    //     <NavLink to="?page=5" className="page-link">
    //       5
    //     </NavLink>
    //   </PaginationItem>
    //   <NavLink to={this.nextPage()} className="page-link">
    //     ▶
    //   </NavLink>
    // </Paging>
  }
}

export default Pagination;
