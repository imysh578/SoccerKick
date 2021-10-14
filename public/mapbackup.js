//===============================기본 지도 세팅===============================
var mapContainer = document.getElementById("map"), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(37.55601255554809, 126.97229546234445), // 지도의 중심좌표
        level: 8,// 지도의 확대 레벨
        mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
    };

// 지도를 생성한다
var map = new kakao.maps.Map(mapContainer, mapOption);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

//===============================노가다부분===============================
//==강동==
var positions = [
    {
        title: "광나루한강공원축구장",
        latlng: new kakao.maps.LatLng(37.55242480860552, 127.1221643613391),
        content: '서울특별시 강동구 암사동 광나루한강공원',
        tag: ["광명구장", "광명"],
    },
    {
        title: "동명축구연습장",
        latlng: new kakao.maps.LatLng(37.56298284411213, 127.16517866048584),
        content:
            '서울특별시 강동구 고덕동 229 동명축구연습장',
        tag: ["영번째인덱스", "강동"],
    },
    {
        title: "강동고등학교",
        latlng: new kakao.maps.LatLng(37.55006858880527, 127.16065944048212),
        content:
            "서울특별시 강동구 상일동 구천면로 572 강동고등학교",
        tag: ["중랑영번째", "중랑첫번째"],
    },
    {
        title: "둔촌고등학교",
        latlng: new kakao.maps.LatLng(37.530919136387176, 127.14436021349452),
        content:
            "서울특별시 강동구 둔촌2동 명일로 140 둔촌고등학교.",
    },

    //==광진구==
    {
        title: "어린이 대공원 축구장",
        latlng: new kakao.maps.LatLng(37.549323984955215, 127.08409680286522),
        content:
            "서울특별시 광진구 구의2동 어린이 대공원.",
    },
];
//===============================마커세팅===============================
function panTo(where) {
    // 이동할 위도 경도 위치를 생성합니다
    positions.forEach((el) => {
        var moveLatLon = el.latlng; // var moveLatLon = 뉴카카맵(좌표)에서 수정, position들의 좌표로 반복으로받아온다
        if (el.content.includes(where)) { // 또는 tag에 foreach문넣고 if넣고돌리기
            //el.title에서바꿈.
            map.panTo(moveLatLon);
        }
    });

    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
}

// 마커 이미지의 이미지 주소입니다
var imageSrc =
    "http://localhost:3000/images/football-logo.png";

for (var i = 0; i < positions.length; i++) {
    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new kakao.maps.Size(24, 35);

    // 마커 이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].content, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
    });
    //===============================커스텀오버레이,인포윈도===============================
    // 마커에 표시할 인포윈도우를 생성합니다 
    var infowindow = new kakao.maps.InfoWindow({
        content: positions[i].title // 인포윈도우에 표시할 내용
    });

    // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
    // 이벤트 리스너로는 클로저를 만들어 등록합니다 
    // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
    kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
    kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
}

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
function makeOverListener(map, marker, infowindow) {
    return function() {
        infowindow.open(map, marker);
    };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
function makeOutListener(infowindow) {
    return function() {
        infowindow.close();
    };

    // //오버레이로할꺼면,, 근데 닫기가안됨..
    // var overlay = new kakao.maps.CustomOverlay({
    //     content: positions[i].content,
    //     map: map,
    //     position: marker.getPosition(), //좌표를 가져오는 카카오고유함수positions[i].latlng 와 같음.
    // });

    // // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
    // kakao.maps.event.addListener(marker, "click", function () {
    //     overlay.setMap(map);
    // });

    // // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
    // function closeOverlay() {
    //     overlay.setMap(null);
    // }
}

//===============================버튼함수들===============================
//검색버튼 설정 addeventlist가 onclick보다 호환성빼고 다좋음. 여러가지실행가능.
var mapbtn = document.getElementById("mapbtn");
var input = document.getElementById("input");

mapbtn.addEventListener("click", function () {
    //두번째 인자에 콜백함수안에 함수?
    panTo(input.value); //panTo()의 값을 그냥 input이아닌 .value로 받아옴.
});

input.addEventListener("keypress", function (e) {
    //enter키로도 함수실행하게함..
    if (e.key === "Enter") {
        //그 키가 enter라는것을 수동으로 설정해줌
        panTo(input.value);
    }
});
