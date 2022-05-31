import React from 'react';
import Postcode from './Postcode';

class MemberComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            아이디: '',
            비밀번호: '',
            비밀번호확인: '',
            이름: '',
            이메일: '',
            휴대폰: '',
            휴대폰인증: '',

            //주소검색API(공공데이터=>카카오)
            isPostOpen: false,  //검색 & 재검색
            isAddressOpen: false, //주소 입력상자 오픈 & 재검색 버튼변경
            우편번호: '',  //검색하여 결과 리턴값
            주소1: '',     //검색하여 결과 리턴값
            주소2: '',     //나머지 상세주소
            주소: '',      //우편번호+주소1+주소2

            // 남성: false,
            // 여성: false,
            // 선택안함: true,          
            성별: '선택안함',

            // 추천인아이디: false,
            // 참여이벤트: false,
            추가입력사항: '',

            생년: '',
            생월: '',
            생일: '',
            생년월일: '',

            //체크박스 : 약관 선택내용이 누적보관 저장
            //체크상태 : true  인 경우에 선택 약관 내용값(value)을 저장
            //체크상태 : false 인 경우에 선택 약관 내용값(value)을 삭제
            약관동의: [] ,

            // 가이드 텍스트 멤버
            // 아이디
            isInfoTextOpenId: false, //인포 텍스트 true 이면 Open false Close
            isAddClassId: '', //입력값이 없으면 공백?'':입력값이 있으면(오류가발생하면?true:false)

            // 비밀번호
            isInfoTextOpenPw : false,
            isAddClassPw1 : '',
            isAddClassPw2 : '',
            isAddClassPw3 : '',

            // 비밀번호확인
            isInfoTextOpenPwRe : false,
            isAddClassPwRe : '',

            // 휴대폰 인증
            isInfoTextOpenPhone : false,
            isAddClassPhone : false,
            isAddClassPhoneCheck: false,
            minutes: 2,
            seconds: 59,
            setId: 0,
            disabled1: false, //사용가능 Disabled  / Enabled => 인증번호를 전송하면  true 설정
            disabled2: false, //사용가능  => 인증번호 확인하고 성공하거나 실해하면 true 설정 단, 인증번호 받기를 클릭하여 노출된 상태에서만
            phoneCheck: false,
            isTimerbox: true,
            phoneKey: '123456',  //통신사에서 응답된 키값 고객 키값이랑 비교 한다.
            isInfoTextOpenPhone: false,
            isAddClassPhone: '',


            isInfoTextOpenAddInput: false,
            placeholderGuideText: '',  //placeholder 
            추가입력상자:'',

            isModalOpen : false,    //중복확인버튼 클릭 => 모달 show & hide 
            modalText : '',         //중복확인 버튼이벤트 가이드 텍스트

            //필수 입력사항 오류체크 
            이메일확인: false,

        }
    }

    //아이디 이벤트 시작 /////////////////////////////////////////
    //키보드 입력 데이터 : 상태관리
    onChangeId = (value) => {
        this.setState({ 아이디: value });
        this.InpuId=value;  //변수

        if(this.state.아이디===''){
            this.setState({isAddClassId: '' });
        }
        else{
            if( /^(?=.*[A-Za-z])+(?=.*[0-9])*[A-Za-z0-9]{6,}$/g.test( value )===false ){
                this.setState({isAddClassId: false });
                return;
            }
            else{
                this.setState({isAddClassId: true });
            }
            
        }
    }

    //아이디 입력상자에 포커스가 되면 
    //가이드 텍스트가 보인다.
    onFocusId=()=>{
        this.setState({isInfoTextOpenId: true});
    }

    //아이디 중복확인 버튼 클릭 이벤트
    onClickId=(e)=>{
        e.preventDefault();       
        this.setState({isModalOpen: true});
        if(this.InpuId===''){
            this.setState({
                isModalOpen: true,
                modalText: `아이디를 입력해 주세요.`
            });
            return;            
        }
        else{
            if( /^(?=.*[A-Za-z])+(?=.*[0-9])*[A-Za-z0-9]{6,}$/g.test(this.InpuId)===false  ){ 
                this.setState({
                    isModalOpen: true,
                    modalText: `아이디는 6자 이상의 영문 혹은 영문과 숫자 조합만 가능합니다`
                });
                return;
            }
            else{

                //로컬스토레이지 저장값 가져오기 그리고 배열에 저장하기
                let imsiDb = [];

                for(let i=0; i<localStorage.length; i++){
                    imsiDb.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }                

                console.log( this.InpuId );

                let result = imsiDb.map((item) => this.InpuId===item.아이디);

                // if(result 결과에 true 가포함되 있으면(포함된) 중복됨){
                if(result.includes(true)){
                    this.setState({
                        modalText: `중복된 아이디 입니다.`,
                        isModalOpen: true,
                    });
                    return;
                }
                else{
                    this.setState({
                        modalText: `사용이 가능합니다.`,
                        isModalOpen: true,
                    });
                }
            }
        }
    }

 

    //아이디 이벤트 끝 /////////////////////////////////////////
    onChangePw = (e) => {
        this.setState({ 비밀번호: e.target.value });

        if(e.target.value===''){
            this.setState({isAddClassPw1:''});
        }
        else{
            this.setState({
                isAddClassPw1: /.{10,}/g.test(e.target.value) 
            });           
        }

        if(e.target.value===''){
            this.setState({isAddClassPw2:''});
        }
        else{
            this.setState({
                isAddClassPw2: /^((?=.*[A-Za-z])+((?=.*[0-9])+|(?=.*[\!\@\$\%\^\&\*\(\)\-\_\=\+\[\]\{\}\'\"\;\:\?\.\,\<\>\`\~\\\|])+)+)[^\s][A-Za-z0-9\!\@\$\%\^\&\*\(\)\-\_\=\+\[\]\{\}\'\"\;\:\?\.\,\<\>\`\~\\\|]{10,}$/g.test(e.target.value) 
            });           
        }


        if(e.target.value===''){
            this.setState({isAddClassPw3:''});
        }
        else{
            this.setState({
                isAddClassPw3: !/(\d)\1\1/g.test(e.target.value) 
            });           
        }


    }

    //비밀번호 포커스 이벤트
    onFocusPw=()=>{
        this.setState({isInfoTextOpenPw: true});
    }


    onChangePwRe = (e) => {
        this.setState({ 비밀번호확인: e.target.value });
        if(e.target.value===''){
            this.setState({isAddClassPwRe:''});
        }
        else{          
            this.setState({
                isAddClassPwRe: this.state.비밀번호===e.target.value
            });
        }
    }
    //비밀번호확인 포커스 이벤트
    onFocusPwRe=()=>{
        this.setState({isInfoTextOpenPwRe: true});
    }



    onChangeName = (e) => {       
        //정규표현식 한글 숫자 공백포함
        //특수문자는 삭제 : 문자열.replace(정규표현식, '')
        this.setState({ 이름:  e.target.value.replace(/[^A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]/g, '') });
    }



    onChangeEmail = (e) => {
        this.InpuEmail=e.target.value;
        this.setState({ 이메일: e.target.value });
    }

    //이메일 중복확인 버튼 클릭 이벤트
    onClcikEmailCheck=(e)=>{
        e.preventDefault();
        
        this.setState({isModalOpen: true});

        if(this.InpuEmail===''){
            //모달창열기                        
            this.setState({
                isModalOpen: true,
                modalText: `이메일 주소를 입력해 주세요.`
            });
            return;            
        }
        else{
            if( /^[A-Za-z0-9]([\.\_\-]?[A-Za-z0-9])*@[A-Za-z0-9_-]([\.\_\-]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/g.test(this.InpuEmail)===false  ){ 
                this.setState({
                    isModalOpen: true,
                    modalText: `잘못된 이메일 형식입니다.`
                });
                return;
            }
            else{

                    //로컬스토레이지 저장값 가져오기 그리고 배열에 저장하기
                    let imsiDb = [];

                    for(let i=0; i<localStorage.length; i++){
                        imsiDb.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                    }                

                    console.log( this.InpuEmail );

                    let result = imsiDb.map((item) => this.InpuEmail===item.이메일);

                    // if(result 결과에 true 가포함되 있으면(포함된) 중복됨){
                    if(result.includes(true)){
                        this.setState({
                            modalText: `중복된 이메일 입니다.`,
                            isModalOpen: true,
                            이메일확인: false
                        });
                        return;
                    }
                    else{
                        this.setState({
                            modalText: `사용 가능한 이메일 입니다.`,
                            isModalOpen: true,
                            이메일확인: true
                        });
                    }

            }
        }

    }   




    // 휴대폰
    onChangePhone = (e) => {
        this.setState({ 휴대폰: e.target.value.replace(/[^0-9]/g,'') });

        if(e.target.value.length>=10){
            this.setState({isAddClassPhone: true});
        }
        else{
            this.setState({isAddClassPhone: false});
        }
    }

    // 휴대폰 인증
    onChangePhoneConfirm = (e) => {
        this.setState({ 휴대폰인증: e.target.value.replace(/[^0-9]/g,'') });
    }



    //인증번호 받기 버튼 클릭 이벤트
    onClickPhoneCheck=(e)=>{
        e.preventDefault();
        
        if(this.state.isAddClassPhone===false){
            return;
        }
        else{
            //정규표현식 휴대폰 전화번호 규칙 수행
            //아래의 인증번호 상자를 보이기
            //인증번호 확인 버튼 보이기
            // 010 348 6441
            // 010 7942 6441
            // 011 7942 6441
            // 016 7942 6441
            // 017 7942 6441
            // 018 7942 6441
            // 019 7942 6441
            if(/^01[016789]{1}[0-9]{3,4}[0-9]{4}$/g.test(this.state.휴대폰)===false){
                this.setState({
                    isAddClassPhone: true,
                    isModalOpen: true,
                    modalText: `휴대폰 번호를 다시 입력하세요.`,
                    disabled1: false,
                    phoneCheck: false //인증번호 확인버튼 상자 안보이기
                });
                return;
            }
            else{
                this.setState({
                    isAddClassPhone: false,
                    isModalOpen: true,
                    modalText: `인증번호를 전송했습니다.`,
                    disabled1: true,
                    phoneCheck: true //인증번호 확인버튼 상자 보이기                                       
                });
                 //카운트 다운 시작(카운트 함수)
                this.countTimer();
            }            
        }
    }

    // 초를 1씩 감소
    // 그리고 0 미만이면 
    // 다시 초기화 초 : 59 셋팅
    // 그리고 분은 -- 1씩 감소
    // 분이 0 미만이면 끝 타임아웃
    // setId 상태관리
    // minutes 상태관리
    // soconds 상태관리
    // 비동기식은 반드시 화살표함수 사용
    countTimer(){
       let timeerId = 0;

           timeerId = setInterval(()=>{
                this.setState({
                    seconds: this.state.seconds-1
                })
                if(this.state.seconds<=0){
                    this.setState({
                        minutes: this.state.minutes-1,
                        seconds: 59
                    })
                    if(this.state.minutes<=0){
                        this.setState({
                            minutes: 0,
                            seconds: 0,
                            isAddClassPhone: false,
                            isModalOpen: true,
                            modalText: `인증제한시간이 지났습니다.`,
                            disabled1: true,
                        })                       
                        clearInterval(this.state.setId);
                        return;
                    }
                }
           }, 1000);

           this.setState({setId: timeerId});
    }

    //마운트 후 타이머를 진행하게 해야한다. 생명주기
   componentDidMount(){
      this.state.phoneCheck && this.countTimer();
   }

   //인증번호 확인 버튼 클릭 이벤트
   onClickPhoneConfirm=(e)=>{
        e.preventDefault();
        
        if(this.state.phoneKey===this.state.휴대폰인증){
            this.setState({
                isModalOpen: true,
                modalText: `인증이 완료 되었습니다.`,
                disabled2: true,
                isTimerbox: false,
                isAddClassPhoneCheck: true,
                isInfoTextOpenPhone: false,
                isAddClassPhone: ''
            });
            clearInterval(this.state.setId);

        }
        else{
            this.setState({
                isModalOpen: true,
                modalText: `인증번호를 다시 입력하세요.`,
                disabled2: false,
                isInfoTextOpenPhone: true,
                isAddClassPhone: false
            }); 
        }        
   }



   
    ////////////////////////////////////////////////
    //모달창 닫기 클릭 이벤트
    onClickModalClose=(e)=>{
        e.preventDefault();
        this.setState({
            isModalOpen: false,
            modalText: ''
        });
    }





    ////////////////////////////////////////////////
    //주소검색API
    //주소검색 완료 후 false를 매개변수 전달받음
    postcodeEvent=(value)=>{
        console.log( value );
        this.setState({isPostOpen: value});
    }
    
    postcodeAddress=(zip, address1)=>{
        this.setState({우편번호: zip });
        this.setState({주소1: address1 });
    }

    //주소검색 버튼 클릭 이벤트
    onPostcode=(e)=>{
        e.preventDefault();
        this.setState({isPostOpen: true});
        this.setState({isAddressOpen: true});
    }

    //우편번호 onChangeZip
    onChangeZip=(value)=>{
        this.setState({우편번호: value});
    }
    //주소1 onChangeAddress1ans
    onChangeAddress1=(value)=>{
        this.setState({주소1: value});
    }
    //주소2 onChangeAddress2
    onChangeAddress2=(value)=>{
        this.setState({주소2: value});
        this.onChangeAddress();
    } 
    //주소
    onChangeAddress=()=>{
        this.setState({주소: `${this.state.우편번호} ${this.state.주소1} ${this.state.주소2}` })
    }
    



    //성별 gender
    //JSX 여기에서 즉각적으로 성별의 값에 따라 체크가 이루어진다.
    onChangeGender = (value) => {
        this.setState({ 성별 : value });
    }
    
    //생년월일
    onChangeYear = (e) => {
        this.setState({생년: e.target.value });
    }
    onChangeMonth = (e) => {
        this.setState({생월: e.target.value });
    }
    onChangeDate = (e) => {
        this.setState({
            생일: e.target.value,
            생년월일: `${this.state.생년}-${this.state.생월}-${e.target.value}`  //1973-09-10
        });
    }
    //추가입력사항 ChoogaInput
    onChoogeInput = (value) => {
        this.setState({ 
            추가입력사항: value ,
            isInfoTextOpenAddInput: true, //아래 입력상자와 가이드 텍스트 보이기
            placeholderGuideText: value==='추천인 아이디' ? '추천인 아이디를 입력해주세요.':'참여 이벤트명을 입력해주세요.'
        });
        
        // if(value==='추천인 아이디'){
        //     this.setState({
        //         placeholderGuideText: '추천인 아이디를 입력해주세요.'
        //     })
        // }
        // else{ //참여 이벤트명
        //     this.setState({                
        //         placeholderGuideText: '참여 이벤트명을 입력해주세요.'
        //     })
        // }
    }

    //추가입력상자
    onChangeAddInput=(value)=>{
       this.setState({추가입력상자: value});
    }


    //약관동의 : 체크박스 이벤트
    onChangeCheck=(checked, value)=>{
        let imsi = '';
        //체크한 내용(값)을 약관동의의 배열안에 누적 보관 저장한다.
        // 만약 체크한상태이면 저장하고 아니면 삭제하라
        // 한/영  : 토글기능
        // 체크 : 토글 (true, false)
        if(checked){
            if(value==='SNS' &&  this.state.약관동의.includes('이메일')){
                this.setState({약관동의: [...this.state.약관동의, 'SNS', "무료배송, 할인쿠폰 등 혜택/정보 수신 동의" ]})
            }
            else if(value==='이메일' &&  this.state.약관동의.includes('SNS')){
                this.setState({약관동의: [...this.state.약관동의, '이메일', "무료배송, 할인쿠폰 등 혜택/정보 수신 동의" ]})
            }
            else if(value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의' &&  this.state.약관동의.includes('SNS') &&  !this.state.약관동의.includes('이메일') ){
                this.setState({약관동의: [...this.state.약관동의, '이메일', "무료배송, 할인쿠폰 등 혜택/정보 수신 동의" ]})
            }
            else if(value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의' &&  !this.state.약관동의.includes('SNS') &&  this.state.약관동의.includes('이메일') ){
                this.setState({약관동의: [...this.state.약관동의, 'SNS', "무료배송, 할인쿠폰 등 혜택/정보 수신 동의" ]})
            }
            else if(value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의' &&  !this.state.약관동의.includes('SNS') &&  !this.state.약관동의.includes('이메일') ){
                this.setState({약관동의: [...this.state.약관동의, 'SNS', '이메일', "무료배송, 할인쿠폰 등 혜택/정보 수신 동의" ]})
            }
            else if(value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의' &&  this.state.약관동의.includes('SNS') &&  this.state.약관동의.includes('이메일') ){
                this.setState({약관동의: [...this.state.약관동의, "무료배송, 할인쿠폰 등 혜택/정보 수신 동의" ]})
            }
            else{
                this.setState({약관동의: [...this.state.약관동의,  value]});
            }

        }
        else{  // 그 밖에(외에)(아니면) 삭제하라
            
            if(value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의' && this.state.약관동의.includes('SNS') && this.state.약관동의.includes('이메일') ){
                imsi = this.state.약관동의.filter( (item) => item !== value );
                imsi = imsi.filter( (item) => item !== 'SNS' );
                imsi = imsi.filter( (item) => item !== '이메일' );
            }
            else if(value==='SNS' && this.state.약관동의.includes('이메일') && this.state.약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의') ){
                imsi = this.state.약관동의.filter( (item) => item !== value );
                imsi = imsi.filter( (item) => item !== '무료배송, 할인쿠폰 등 혜택/정보 수신 동의' );
            }
            else if(value==='이메일' && this.state.약관동의.includes('SNS') && this.state.약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의') ){
                imsi = this.state.약관동의.filter( (item) => item !== value );
                imsi = imsi.filter( (item) => item !== '무료배송, 할인쿠폰 등 혜택/정보 수신 동의' );
            }
            else{
                imsi = this.state.약관동의.filter((item)=>item!==value);  //논리비교 연산자 ===  !==
            }
            this.setState({약관동의: imsi});
        }
       
    }

    onChangeCheckAll=(checked)=>{

        if(checked){
            //모든 내용을 배열에 넣어준다.
            const temp = [
                "이용약관동의(필수)",
                "개인정보 수집·이용 동의(필수)",
                "개인정보 수집·이용 동의(선택)",
                "무료배송, 할인쿠폰 등 혜택/정보 수신 동의",
                "SNS",
                "이메일",
                "본인은 만 14세 이상입니다.(필수)"
            ]
            this.setState({약관동의: temp });
        }
        else{
            //모든 내용을 삭제한다.
            this.setState({약관동의: [] });  //빈배열 삭제
        }
    }



    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //폼전송 : 가입정보 저장
    onSubmitfn = (e) => {
        e.preventDefault();

        //1. 필수 입력사항 점검 빈데이터 전송 취소
        //2. 필수 입력사항 입력형식 오류(빨강 정규표현식 오류!)가 한개라도 있으면 전송 취소
        //   휴대폰 인증 ok가 아니면 전송취소
        //3. 약관동의에서 필수 선택사항 3개를 선택해야만 전송된다.
        
        //   입력데이터 5개이상 저장하고 테스트하고 그리고 마지막 중복확인 마무리
        //4. 아이디중복확인버튼/이메일중복확인버튼 두가지 모두 클릭안하면 전송취소

        
        //비구조화(구조분할할당)
        const {
                아이디, 비밀번호, 이름, 이메일, 휴대폰,  우편번호, 주소, 주소1,  주소2, 성별, 추가입력사항, 추가입력상자, 생년월일, 약관동의,
                isAddClassId, isAddClassPw1, isAddClassPw2, isAddClassPw3, isAddClassPwRe, 이메일확인, isAddClassPhoneCheck
        } = this.state;

        //약관동의 필수 선택 갯수 체크 반복문
        //search(), indexOf()
        //체크한 체크상자의 value 값 확인
        let cnt=0;
        for(let i=0; i<약관동의.length; i++){
           if( 약관동의[i].indexOf('필수') >=0 ){
               cnt++;
           }
        }
        console.log(cnt);

        if(아이디===''||비밀번호===''||이름===''||이메일===''||휴대폰===''||주소2==='' ){
            if(아이디===''){
                this.setState({
                    isModalOpen: true,
                    modalText: '아이디를 입력하세요.'
                })
            }
            else if(비밀번호===''){
                this.setState({
                    isModalOpen: true,
                    modalText: '비밀번호를 입력하세요.'
                })
            }            
            else if(이름===''){
                this.setState({
                    isModalOpen: true,
                    modalText: '이름을 입력하세요.'
                })
            }
            else if(이메일===''){
                this.setState({
                    isModalOpen: true,
                    modalText: '이메일을 입력하세요.'
                })
            }
            else if(휴대폰===''){
                this.setState({
                    isModalOpen: true,
                    modalText: '휴대폰을 입력하세요.'
                })
            }
            else if(주소2===''){
                this.setState({
                    isModalOpen: true,
                    modalText: '주소를 입력하세요.'
                })
            }                       
            return;
        }
        else if(isAddClassId===false || isAddClassPw1===false ||isAddClassPw2===false ||isAddClassPw3===false ||isAddClassPwRe===false ||이메일확인===false ||isAddClassPhoneCheck===false){ //필수 입력사항 정규식 false 이면 전송취소
            if(isAddClassId===false){
                this.setState({
                    isModalOpen: true,
                    modalText: '아이디를 다시입력하세요.'
                })
            } 
            else if(isAddClassPw1===false){
                this.setState({
                    isModalOpen: true,
                    modalText: '비밀번호는 10자 이상입니다. 확인하고 다시입력하세요.'
                })
            } 
            else if(isAddClassPw2===false){
                this.setState({
                    isModalOpen: true,
                    modalText: '영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합, 확인하고 다시입력하세요.'
                })
            } 
            else if(isAddClassPw3===false){
                this.setState({
                    isModalOpen: true,
                    modalText: '동일한 숫자 3개 이상 연속 사용 불가, 확인하고 다시입력하세요.'
                })
            } 
            else if(isAddClassPwRe===false){
                this.setState({
                    isModalOpen: true,
                    modalText: '동일한 비밀번호를 입력해주세요. 확인하고 다시입력하세요.'
                })
            } 
            else if(이메일확인===false){
                this.setState({
                    isModalOpen: true,
                    modalText: '이메일을 확인하고 다시입력하세요.'
                })
            } 
            else if(isAddClassPhoneCheck===false){
                this.setState({
                    isModalOpen: true,
                    modalText: '휴대폰번호를 확인하고 인증절차를 다시해주세요.'
                })
            } 
            return;
        }
        else if(cnt<3){
            this.setState({
                isModalOpen: true,
                modalText: '약관동의중 필수 선택을  다시해주세요.'
            })
        }
        else { //전송

            const inputObj = {
                //index 고유한 저장 인덱스 번호 AI(Autoincrement)  데이터베이스에서 설정할 필드(Feild===Item) type 숫자 정수 Int 
                아이디: 아이디,  //가변형 문자열(VARCHAR) String 20
                비밀번호: 비밀번호, //가변형 문자열(VARCHAR) String 20
                이름: 이름,   //가변형 문자열(VARCHAR) String 100
                이메일: 이메일,  //가변형 문자열(VARCHAR) String 500
                휴대폰: 휴대폰.replace(/^(01[016789]{1})([0-9]{3,4})([0-9]{4})$/g ,'$1-$2-$3'),  //010-7942-5305   //가변형 문자열(VARCHAR) String 13
                주소: `${우편번호} ${주소1} ${주소2}`,   //주소2 250 가변형 문자열(VARCHAR) String 500
    
                성별: 성별,    //가변형 문자열(VARCHAR) String 4             
                생년월일: 생년월일,   //날짜형 DATE
                추가입력사항: `${추가입력사항}: ${추가입력상자}`, //가변형 문자열(VARCHAR) String 250
                약관동의: 약관동의,  // //가변형 문자열(VARCHAR) String 1000
                가입일자: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ` //날짜형 DATE
            }
                    
            //로컬스토레이지 데이터이는 반드시 문자열만 가능 
            // : 객체형식 데이터를 문자열 형식으로 변환하여 저장한다.
            
            // localStorage.setItem( inputObj.아이디,  inputObj ); 데이터 안들어감 Object 로 들어감
            localStorage.setItem( inputObj.아이디,  JSON.stringify(inputObj) );
    

            //초기화
            this.setState({
                아이디: '',
                비밀번호: '',
                비밀번호확인: '',
                이름: '',
                이메일: '',
                휴대폰: '',
                휴대폰인증: '',
    
                //주소검색API(공공데이터=>카카오)
                isPostOpen: false,  //검색 & 재검색
                isAddressOpen: false, //주소 입력상자 오픈 & 재검색 버튼변경
                우편번호: '',  //검색하여 결과 리턴값
                주소1: '',     //검색하여 결과 리턴값
                주소2: '',     //나머지 상세주소
                주소: '',      //우편번호+주소1+주소2
    
                // 남성: false,
                // 여성: false,
                // 선택안함: true,          
                성별: '선택안함',
    
                // 추천인아이디: false,
                // 참여이벤트: false,
                추가입력사항: '',
    
                생년: '',//new Date().getFullYear(),
                생월: '',// new Date().getMonth()+1,   //0 ~ 11
                생일: '',//new Date().getDate(),
                생년월일: '',
    
                //체크박스 : 약관 선택내용이 누적보관 저장
                //체크상태 : true  인 경우에 선택 약관 내용값(value)을 저장
                //체크상태 : false 인 경우에 선택 약관 내용값(value)을 삭제
                약관동의: [] ,
    
                // 가이드 텍스트 멤버
                // 아이디
                isInfoTextOpenId: false, //인포 텍스트 true 이면 Open false Close
                isAddClassId: '', //입력값이 없으면 공백?'':입력값이 있으면(오류가발생하면?true:false)
    
                // 비밀번호
                isInfoTextOpenPw : false,
                isAddClassPw1 : '',
                isAddClassPw2 : '',
                isAddClassPw3 : '',
    
                // 비밀번호확인
                isInfoTextOpenPwRe : false,
                isAddClassPwRe : '',
    
                // 휴대폰 인증
                isInfoTextOpenPhone : false,
                isAddClassPhone : false,
                isAddClassPhoneCheck: false,
                minutes: 2,
                seconds: 59,
                setId: 0,
                disabled1: false, //사용가능 Disabled  / Enabled => 인증번호를 전송하면  true 설정
                disabled2: false, //사용가능  => 인증번호 확인하고 성공하거나 실해하면 true 설정 단, 인증번호 받기를 클릭하여 노출된 상태에서만
                phoneCheck: false,
                isTimerbox: true,
                phoneKey: '123456',  //통신사에서 응답된 키값 고객 키값이랑 비교 한다.
                isInfoTextOpenPhone: false,
                isAddClassPhone: '',
    
    
                isInfoTextOpenAddInput: false,
                placeholderGuideText: '',  //placeholder 
                추가입력상자:'',
    
                isModalOpen : false,    //중복확인버튼 클릭 => 모달 show & hide 
                modalText : '',         //중복확인 버튼이벤트 가이드 텍스트
    
                //필수 입력사항 오류체크 
                이메일확인: false,
            });



        }


       
    }

    render() {
        return (
            <div id='member'>

                <div className='logo-box'>
                    <img src='../../img/logo_x2.png' alt='logo' />
                </div>

                <h1>회원가입</h1>

                <div id='form-box'>
                    <div className='side-title'><span><i>*</i>필수입력사항</span></div>
                    <form onSubmit={this.onSubmitfn} name='member' id='member' method='get' action='./resphonse.php'>
                        <ul>
                            <li>
                                <div className='left'>
                                    <span>아이디<i>*</i></span>    
                                </div>
                                <div className='right'>
                                    <input 
                                    type='text' 
                                    className='input-box' 
                                    onChange={(e)=>this.onChangeId(e.target.value)}  /* 지위여부 정규표현식 */
                                    placeholder='6자이상의 영문 혹은 영문과 숫자를 조합'
                                    value={this.state.아이디} 
                                    onFocus={(e)=>this.onFocusId(e)}
                                    maxLength={20}
                                    />
                                    {
                                        // 포커스이벤트
                                        this.state.isInfoTextOpenId && (
                                            <div className='info-text'>
                                                <p className={
                                                    (
                                                        this.state.isAddClassId===''?'': 
                                                        (this.state.isAddClassId?`addCheck`:`addXbar`)
                                                    )
                                                }>6자이상의 영문 혹은 영문과 숫자를 조합</p>
                                                <p>아이디 중복확인</p>
                                            </div>
                                        )
                                    }
                                    <button onClick={this.onClickId} className='duplicate-btn'>중복확인</button>                                        
                                </div>
                            </li>
                            <li>
                                <div className='left'>
                                    <span>비밀번호<i>*</i></span>    
                                </div>
                                <div className='right'>
                                    <input 
                                    type='password' 
                                    className='input-box' 
                                    onChange={this.onChangePw}  
                                    placeholder='비밀번호를 입력해주세요' 
                                    value={this.state.비밀번호}
                                    onFocus={this.onFocusPw}
                                    maxLength={20}
                                    autoComplete='off'
                                    />
                                    {                                       
                                        this.state.isInfoTextOpenPw  && (          
                                            <div className='info-text addInfo'>
                                                <p className={
                                                    (
                                                        this.state.isAddClassPw1===''?'': 
                                                        (this.state.isAddClassPw1?`addCheck`:`addXbar`)
                                                    )
                                                }>10이상 입력</p>
                                                <p className={
                                                    (
                                                        this.state.isAddClassPw2===''?'': 
                                                        (this.state.isAddClassPw2?`addCheck`:`addXbar`)
                                                    )
                                                }>영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합</p>
                                                <p className={
                                                    (
                                                        this.state.isAddClassPw3===''?'': 
                                                        (this.state.isAddClassPw3?`addCheck`:`addXbar`)
                                                    )
                                                }>동일한 숫자 3개 이상 연속 사용 불가</p>
                                            </div>                                                                           
                                        )
                                    }
                                </div>
                            </li>
                            <li>
                                <div className='left'>
                                    <span>비밀번호확인<i>*</i></span>    
                                </div>
                                <div className='right'>
                                    <input 
                                    type='password' 
                                    className='input-box' 
                                    onChange={this.onChangePwRe}  
                                    placeholder='비밀번호를 한번 더 입력해주세요' 
                                    value={this.state.비밀번호확인}
                                    onFocus={this.onFocusPwRe}
                                    autoComplete='off'
                                    maxLength={20}
                                    />
                                    {
                                        this.state.isInfoTextOpenPwRe  && (
                                            <div className='info-text addInfo'>
                                                <p className={
                                                    (
                                                        this.state.isAddClassPwRe===''?'': 
                                                        (this.state.isAddClassPwRe?`addCheck`:`addXbar`) 
                                                    )
                                                }>동일한 비밀번호를 입력해주세요.</p>
                                            </div>   
                                        )
                                    }                                                                        
                                </div>
                            </li>
                            <li>
                                <div className='left'>
                                    <span>이름<i>*</i></span>    
                                </div>
                                <div className='right'>
                                <input 
                                type='text' 
                                className='input-box'  
                                onChange={this.onChangeName}  
                                placeholder='이름' 
                                value={this.state.이름}
                                maxLength={100}
                                />
                                </div>
                            </li>
                            <li>
                                <div className='left'>
                                    <span>이메일<i>*</i></span>    
                                </div>
                                <div className='right'>
                                    <input 
                                    type='email' 
                                    className='input-box'  
                                    onChange={this.onChangeEmail}  
                                    placeholder='이메일' 
                                    value={this.state.이메일}
                                    maxLength={500}
                                    />
                                    <button onClick={this.onClcikEmailCheck} className='duplicate-btn'>중복확인</button>                                        
                                </div>
                            </li>
                            <li>
                                <div className='left'>
                                    <span>휴대폰<i>*</i></span>    
                                </div>
                                <div className='right'>
                                    <input 
                                    type='text'  
                                    className='input-box'  
                                    onChange={this.onChangePhone}  
                                    placeholder='휴대폰' 
                                    value={this.state.휴대폰}
                                    disabled={this.state.disabled1}
                                    maxLength={11}
                                    />
                                    <button onClick={this.onClickPhoneCheck} className={`duplicate-btn 
                                    ${(
                                        this.state.isAddClassPhone===``?``:(this.state.isAddClassPhone===true?``:`phone-btn`)
                                    )}
                                    `}  disabled={this.state.disabled1}>인증번호 받기</button>     

                                     {  
                                        this.state.phoneCheck && ( 
                                            <>
                                                <input 
                                                type='text'  
                                                className='input-box phone-confirm'  
                                                onChange={this.onChangePhoneConfirm}  
                                                placeholder='' 
                                                value={this.state.휴대폰인증}
                                                disabled={this.state.disabled2}
                                                />                                  
                                                <button 
                                                onClick={this.onClickPhoneConfirm} 
                                                className={`duplicate-btn  phone-confirm-btn ${(
                                                    this.state.isAddClassPhoneCheck===``?``:(this.state.isAddClassPhoneCheck===true?`phone-btn`:``)
                                                )}
                                                `} disabled={this.state.disabled2}>인증번호 확인</button> 

                                                {                                                
                                                    this.state.isTimerbox  && (
                                                        <span className='counter-box'>{this.state.minutes}:{this.state.seconds<10 ? `0`+this.state.seconds : this.state.seconds}</span>
                                                    )
                                                }
                                                {
                                                    this.state.isInfoTextOpenPhone  && (
                                                        <div className='info-text addInfo'>
                                                            <p className={
                                                                (
                                                                    this.state.isAddClassPhone===''?'': 
                                                                    (this.state.isAddClassPhone?`addCheck`:`addXbar`) 
                                                                )
                                                            }>인증번호를 확인해주세요.</p>
                                                        </div>   
                                                    )
                                                }  
                                            </>
                                        )
                                     }      
                                </div>
                            </li>

                            <li>
                                <div className='left'>
                                    <span>주소<i>*</i></span>    
                                </div>
                                <div className='right'>
                                    {
                                        //show & hide : true 이면 보이고 false이면 안보인다.
                                        this.state.isAddressOpen && (   
                                            <>
                                                {/* 우편번호 */}
                                                <input 
                                                    type='text'  
                                                    className='input-box input-address  input-zip'  
                                                    onChange={(e)=>this.onChangeZip(e.target.value)}
                                                    placeholder='검색 우편번호' 
                                                    value={this.state.우편번호}
                                                />              
                                                {/* 주소1 */}
                                                <input 
                                                    type='text'  
                                                    className='input-box input-address'  
                                                    onChange={(e)=>this.onChangeAddress1(e.target.value)}  
                                                    placeholder='검색 주소' 
                                                    value={this.state.주소1}
                                                />                                        
                                                {/* 주소2 */}
                                                <input 
                                                    type='text'  
                                                    className='input-box input-address'  
                                                    onChange={(e)=>this.onChangeAddress2(e.target.value)}  
                                                    placeholder='나머지 주소를 입력하세요!' 
                                                    value={this.state.주소2}
                                                    maxLength={250}
                                                />
                                            </>
                                        )
                                    }     
                                    {/* 버튼 모양 변경 언제? 주소입력상자가 오픈되면     */}
                                    <button 
                                    className={`address-btn ${this.state.isAddressOpen?` open`:``}`}
                                    onClick={this.onPostcode}>
                                        <span><i className='fa fa-search'></i>
                                            {this.state.isAddressOpen?`주소재검색`:`주소검색`}
                                        </span>
                                    </button> 
                                    <div className='info-text btn-text'>
                                        <p>배송지에 따라 상품 정보가 달라질 수 있습니다.</p>
                                    </div>

                                    {/* 주소검색 검포넌트 */}
                                    {
                                      this.state.isPostOpen && (
                                           <Postcode  postcodeEvent={this.postcodeEvent}  postcodeAddress={this.postcodeAddress}/>
                                      )                                    
                                    }
                                    

                                </div>
                            </li>

                            <li>
                                <div className='left'>
                                    <span>성별</span>    
                                </div>
                                <div className='right'>
                                    <div className='gender-box'>
                                        <span>
                                            <input 
                                            id='inputMale' 
                                            type='radio' 
                                            onChange={(e)=>this.onChangeGender(e.target.value)}  
                                            name='gender' 
                                            value='남성'  
                                            checked={this.state.성별.includes('남성')} 
                                            />
                                            <label htmlFor='inputMale'>남성</label>                                        
                                        </span>
                                        <span>
                                            <input 
                                            id='inputFemale' 
                                            type='radio'  
                                            onChange={(e)=>this.onChangeGender(e.target.value)}  
                                            name='gender'  
                                            value='여성'  
                                            checked={this.state.성별.includes('여성')}  
                                            />
                                            <label htmlFor='inputFemale'>여성</label>
                                        </span>
                                        <span>                                        
                                            <input 
                                            id='inputNone' 
                                            type='radio'  
                                            onChange={(e)=>this.onChangeGender(e.target.value)}  
                                            name='gender' 
                                            value='선택안함'   
                                            checked={this.state.성별.includes('선택안함')}  
                                            />
                                            <label htmlFor='inputNone'>선택안함</label>
                                        </span>
                                    </div>                                     
                                </div>
                            </li>

                            <li>
                                <div className='left'>
                                    <span>생년월일</span>    
                                </div>
                                <div className='right'>
                                    <div className='birthday'>
                                        <input 
                                        type='text' 
                                        placeholder='YYYY'
                                        onChange={this.onChangeYear}  
                                        value={this.state.생년}
                                        maxLength={4}
                                        />
                                        <input 
                                        type='text' 
                                        placeholder='MM'  
                                        onChange={this.onChangeMonth}  
                                        value={this.state.생월} 
                                        maxLength={2}
                                        />
                                        <input 
                                        type='text' 
                                        placeholder='DD'  
                                        onChange={this.onChangeDate} 
                                        value={this.state.생일} 
                                        maxLength={2}
                                        />
                                    </div>                       
                                </div>
                            </li>


                            <li>
                                <div className='left'>
                                    <span>추가 입력 사항</span>    
                                </div>
                                <div className='right'>
                                    <div className='addinput-box'>
                                        <span>
                                            <input 
                                            id='inputChoo' 
                                            type='radio' 
                                            onChange={(e)=>this.onChoogeInput(e.target.value)}  
                                            name='choo' 
                                            value='추천인 아이디' 
                                            checked={this.state.추가입력사항.includes(`추천인 아이디`)} 
                                            />
                                            <label htmlFor='inputChoo'>추천인 아이디</label>                                        
                                        </span>
                                        <span>
                                            <input 
                                            id='inputEvent' 
                                            type='radio'  
                                            onChange={(e)=>this.onChoogeInput(e.target.value)}  
                                            name='choo'  
                                            value='참여 이벤트명'  
                                            checked={this.state.추가입력사항.includes(`참여 이벤트명`)} 
                                            />
                                            <label htmlFor='inputEvent'>참여 이벤트명</label>
                                        </span>
                                    </div> 
                                    {
                                        this.state.isInfoTextOpenAddInput  && (
                                            <div className='info-text addInfo'>
                                                <input 
                                                    type='text'  
                                                    className='input-box input-add'  
                                                    onChange={(e)=>this.onChangeAddInput(e.target.value)}  
                                                    placeholder={this.state.placeholderGuideText}
                                                    value={this.state.추가입력상자}
                                                    maxLength={250}
                                                />
                                                <p className='add-input'>
                                                    추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다.<br/>
                                                    가입 이후, 수정이 불가합니다.<br/>
                                                    대소문자 및 띄어쓰기에 유의해주세요.
                                                </p>
                                            </div>   
                                        )
                                    }                                    
                                </div>
                            </li>

                            {/* 이용약관 */}
                            <li>
                                <hr />
                            </li>

                            <li>
                                <div className='left'>
                                    <span>이용약관동의<i>*</i></span>    
                                </div>
                                <div className='right'>
                                    <dl className='service-box'>
                                        <dt>
                                            {/* id : 반드시 모두 이름이 달라야한다.` */}
                                            {/* 라디오버튼 : name 이 반드시 같아야 한다. */}
                                            {/* 체크박스   : name 이 반드시 달라야 한다. */}
                                            <label>
                                                <input 
                                                type='checkbox' 
                                                id='checkAll' 
                                                name='checkAll' 
                                                value='추천인 아이디'
                                                onChange={(e)=>this.onChangeCheckAll(e.target.checked)}
                                                checked={this.state.약관동의.length>=7?true:false}  
                                                />
                                                <span>전체 동의합니다.</span>
                                            </label> 
                                            <p>
                                                선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.
                                            </p>                                       
                                        </dt>
                                        <dd>
                                            <label>
                                                <input 
                                                type='checkbox' 
                                                id='check1' 
                                                name='check1' 
                                                value='이용약관동의(필수)'  
                                                onChange={(e)=>this.onChangeCheck(e.target.checked, e.target.value)} 
                                                checked={this.state.약관동의.includes('이용약관동의(필수)')} 
                                                />
                                                <span>이용약관동의<i>(필수)</i></span>                                                
                                            </label>
                                            <span className='confirm'><a href='#!'>약관동의<i>&gt;</i></a></span>
                                        </dd>
                                        <dd>
                                            <label>
                                                <input 
                                                type='checkbox' 
                                                id='check2' 
                                                name='check2' 
                                                value='개인정보 수집·이용 동의(필수)'  
                                                onChange={(e)=>this.onChangeCheck(e.target.checked, e.target.value)} 
                                                checked={this.state.약관동의.includes('개인정보 수집·이용 동의(필수)')}                                                 
                                                />
                                                <span>개인정보 수집·이용 동의<i>(필수)</i></span>                                                
                                            </label>
                                            <span className='confirm'><a href='#!'>약관동의<i>&gt;</i></a></span>
                                        </dd>
                                        <dd>
                                            <label>
                                                <input 
                                                type='checkbox' 
                                                id='check3' 
                                                name='check3' 
                                                value='개인정보 수집·이용 동의(선택)'
                                                onChange={(e)=>this.onChangeCheck(e.target.checked, e.target.value)} 
                                                checked={this.state.약관동의.includes('개인정보 수집·이용 동의(선택)')}                                                  
                                                />
                                                <span>개인정보 수집·이용 동의<i>(선택)</i></span>                                                
                                            </label>
                                            <span className='confirm'><a href='#!'>약관동의<i>&gt;</i></a></span>
                                        </dd>
                                        <dd>
                                            <label>
                                                <input 
                                                type='checkbox' 
                                                id='check4' 
                                                name='check4' 
                                                value='무료배송, 할인쿠폰 등 혜택/정보 수신 동의'  
                                                onChange={(e)=>this.onChangeCheck(e.target.checked, e.target.value)} 
                                                checked={this.state.약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의')}                                                  
                                                />
                                                <span>무료배송, 할인쿠폰 등 혜택/정보 수신 동의</span>                                                
                                            </label>
                                            <div className='check4-sub'>
                                                <label>
                                                    <input 
                                                    type='checkbox' 
                                                    id='check4-1' 
                                                    name='check4-1' 
                                                    value='SNS'
                                                    onChange={(e)=>this.onChangeCheck(e.target.checked, e.target.value)} 
                                                    checked={this.state.약관동의.includes('SNS')}    
                                                    />
                                                    <span>SNS</span>                                                
                                                </label>
                                                <label>
                                                    <input 
                                                    type='checkbox' 
                                                    id='check4-2' 
                                                    name='check4-2' 
                                                    value='이메일'  
                                                    onChange={(e)=>this.onChangeCheck(e.target.checked, e.target.value)} 
                                                    checked={this.state.약관동의.includes('이메일')}                                                      
                                                    />
                                                    <span>이메일</span>                                                
                                                </label> 
                                                <p>                                                    
                                                    동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내
                                                </p>  
                                            </div>
                                        </dd>
                                        <dd>
                                            <label>
                                                <input 
                                                type='checkbox' 
                                                id='check5' 
                                                name='check5' 
                                                value='본인은 만 14세 이상입니다.(필수)'  
                                                onChange={(e)=>this.onChangeCheck(e.target.checked, e.target.value)} 
                                                checked={this.state.약관동의.includes('본인은 만 14세 이상입니다.(필수)')}                                                    
                                                />
                                                <span>본인은 만 14세 이상입니다.<i>(필수)</i></span>                                                
                                            </label>                                            
                                        </dd>                                        
                                    </dl>                                     
                                </div>
                            </li>

                        </ul>

                        <div className='button-box'>
                            <button type='submit'>가입하기</button>
                        </div>
                    </form>
                </div>  

                {            
                    this.state.isModalOpen && (
                        <div id='modal'>
                            <div className='container'>
                                <div className='header'>
                                <ul>
                                    <li>
                                        <h1>알림메시지</h1>
                                        <span><a href='#!' onClick={this.onClickModalClose} title='Close'><img src='../../img/ico_close_999_32x32.png'  alt='close icon'/></a></span>
                                        </li>
                                    <li>
                                        <p>{this.state.modalText}</p>
                                    </li>
                                </ul>         
                                </div>
                                <div className='footer'>
                                    <button  onClick={this.onClickModalClose} className='ok-btn'>확인</button>        
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        );
    }
}

export default MemberComponent;