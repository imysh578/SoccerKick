// 마커를 담을 배열입니다
var markers = [];

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.57943874417839, 126.99104195887664), // 지도의 중심좌표
        level: 8 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption);
var positions = [
    //==강동구==
    {
        title: "광나루한강공원축구장",
        latlng: new kakao.maps.LatLng(37.55242480860552, 127.1221643613391),
        content:'<div class="wrap">' + 
        '    <div class="info">' + 
        '        <div class="title">' + 
        '            광나루 한강공원 축구장' + 
        '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
        '        </div>' + 
        '        <div class="body">' + 
        '            <div class="img">' +
        '                <img src="https://lh5.googleusercontent.com/p/AF1QipNNIPAPat6rUMjVRk9VeAZem18mGDuTKZD49Kin=w426-h240-k-no" width="73" height="70">' +
        '           </div>' + 
        '            <div class="desc">' + 
        '                <div class="ellipsis">서울특별시 강동구 선사로 83-66(암사동)</div>' + 
          
        '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
        '            </div>' + 
        '        </div>' + 
        '    </div>' +    
        '</div>'
    },
    {
        title: "동명축구연습장",
        latlng: new kakao.maps.LatLng(37.56298284411213, 127.16517866048584),
        content:
        '<div class="wrap">' + 
        '    <div class="info">' + 
        '        <div class="title">' + 
        '            동명축구연습장' + 
        '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
        '        </div>' + 
        '        <div class="body">' + 
        '            <div class="img">' +
        '                <img src="https://lh5.googleusercontent.com/p/AF1QipMT6qFfRaG2vklKq_w0J9KadjVoBOusa7b2xmkx=w408-h306-k-no" width="73" height="70">' +
        '           </div>' + 
        '            <div class="desc">' + 
        '                <div class="ellipsis">서울특별시 강동구 고덕동 229</div>' + 
          
        '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
        '            </div>' + 
        '        </div>' + 
        '    </div>' +    
        '</div>'
    },
    {
        title: "강동고등학교",
        latlng: new kakao.maps.LatLng(37.55006858880527, 127.16065944048212),
        content:
        '<div class="wrap">' + 
        '    <div class="info">' + 
        '        <div class="title">' + 
        '            강동고등학교' + 
        '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
        '        </div>' + 
        '        <div class="body">' + 
        '            <div class="img">' +
        '                <img src="https://scontent-ssn1-1.xx.fbcdn.net/v/t1.18169-9/179903_418585461517247_1640794794_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=973b4a&_nc_ohc=tYiGIKIAwK8AX-cG70q&_nc_ht=scontent-ssn1-1.xx&oh=bcc92f85692397e55add508ad32ee666&oe=618EB1CF" width="73" height="70">' +
        '           </div>' + 
        '            <div class="desc">' + 
        '                <div class="ellipsis">서울특별시 강동구 상일동 구천면로 572</div>' + 
          
        '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
        '            </div>' + 
        '        </div>' + 
        '    </div>' +    
        '</div>'
    },
    {
        title: "둔촌고등학교",
        latlng: new kakao.maps.LatLng(37.530919136387176, 127.14436021349452),
        content:
        '<div class="wrap">' + 
        '    <div class="info">' + 
        '        <div class="title">' + 
        '            둔촌고등학교' + 
        '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
        '        </div>' + 
        '        <div class="body">' + 
        '            <div class="img">' +
        '                <img src="https://doonchon.sen.hs.kr/dggb/module/file/selectImageView.do?atchFileId=182134&fileSn=0" width="73" height="70">' +
        '           </div>' + 
        '            <div class="desc">' + 
        '                <div class="ellipsis">서울특별시 강동구 둔촌2동 명일로 140</div>' + 
          
        '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
        '            </div>' + 
        '        </div>' + 
        '    </div>' +    
        '</div>'
    },

    //==광진구==
    {
        title: "어린이 대공원 축구장",
        latlng: new kakao.maps.LatLng(37.54776604058388, 127.08438680272921),
        content:
            '<div class="wrap">' + 
            '    <div class="info">' + 
            '        <div class="title">' + 
            '           어린이 대공원 축구장' + 
            '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
            '        </div>' + 
            '        <div class="body">' + 
            '            <div class="img">' +
            '                <img src="https://lh5.googleusercontent.com/p/AF1QipNNIPAPat6rUMjVRk9VeAZem18mGDuTKZD49Kin=w426-h240-k-no" width="73" height="70">' +
            '           </div>' + 
            '            <div class="desc">' + 
            '                <div class="ellipsis">서울특별시 광진구 구의2동 어린이 대공원</div>' + 
              
            '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '</div>',
    },
    {
        title: "아차산 배수지 체육공원",
        latlng: new kakao.maps.LatLng(37.549160287302094, 127.0970406451876),
        content:
            '<div class="wrap">' + 
            '    <div class="info">' + 
            '        <div class="title">' + 
            '           아차산 배수지 체육공원' + 
            '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
            '        </div>' + 
            '        <div class="body">' + 
            '            <div class="img">' +
            '                <img src="https://lh5.googleusercontent.com/p/AF1QipNNIPAPat6rUMjVRk9VeAZem18mGDuTKZD49Kin=w426-h240-k-no" width="73" height="70">' +
            '           </div>' + 
            '            <div class="desc">' + 
            '                <div class="ellipsis">서울특별시 광진구 구의동 38-4</div>' + 
              
            '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '</div>',
    },
    

    //==중랑구==
    {
        title: "중랑구립 잔디구장",
        latlng: new kakao.maps.LatLng(37.60855926051868, 127.113410259992),
        content:
            '<div class="wrap">' + 
            '    <div class="info">' + 
            '        <div class="title">' + 
            '           중랑구립 잔디구장' + 
            '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
            '        </div>' + 
            '        <div class="body">' + 
            '            <div class="img">' +
            '                <img src="https://lh5.googleusercontent.com/p/AF1QipNNIPAPat6rUMjVRk9VeAZem18mGDuTKZD49Kin=w426-h240-k-no" width="73" height="70">' +
            '           </div>' + 
            '            <div class="desc">' + 
            '                <div class="ellipsis">서울특별시 중랑구 망우동</div>' + 
              
            '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '</div>',
    },
    {
        title: "용마폭포공원 축구장",
        latlng: new kakao.maps.LatLng(37.57572489826034, 127.09027796070694),
        content:
            '<div class="wrap">' + 
            '    <div class="info">' + 
            '        <div class="title">' + 
            '           용마폭포공원 축구장' + 
            '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
            '        </div>' + 
            '        <div class="body">' + 
            '            <div class="img">' +
            '                <img src="https://lh5.googleusercontent.com/p/AF1QipNNIPAPat6rUMjVRk9VeAZem18mGDuTKZD49Kin=w426-h240-k-no" width="73" height="70">' +
            '           </div>' + 
            '            <div class="desc">' + 
            '                <div class="ellipsis">서울특별시 중랑구 면목동 산72-6</div>' + 
              
            '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '</div>',
    },
    
    //==송파구==
    {
        title: "송파구 여성 축구장",
        latlng: new kakao.maps.LatLng(37.524421480890716, 127.11853262115498),
        content:
            '<div class="wrap">' + 
            '    <div class="info">' + 
            '        <div class="title">' + 
            '           송파구 여성 축구장' + 
            '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
            '        </div>' + 
            '        <div class="body">' + 
            '            <div class="img">' +
            '                <img src="https://lh5.googleusercontent.com/p/AF1QipNNIPAPat6rUMjVRk9VeAZem18mGDuTKZD49Kin=w426-h240-k-no" width="73" height="70">' +
            '           </div>' + 
            '            <div class="desc">' + 
            '                <div class="ellipsis">서울특별시 송파구 방이동</div>' + 
              
            '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '</div>',
    },
    {
        title: "잠실 어울림 축구장",
        latlng: new kakao.maps.LatLng(37.50344444958651, 127.07758342330298),
        content:
            '<div class="wrap">' + 
            '    <div class="info">' + 
            '        <div class="title">' + 
            '           잠실 어울림 축구장' + 
            '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
            '        </div>' + 
            '        <div class="body">' + 
            '            <div class="img">' +
            '                <img src="https://lh5.googleusercontent.com/p/AF1QipNNIPAPat6rUMjVRk9VeAZem18mGDuTKZD49Kin=w426-h240-k-no" width="73" height="70">' +
            '           </div>' + 
            '            <div class="desc">' + 
            '                <div class="ellipsis">서울특별시 송파구 잠실동 304-19</div>' + 
              
            '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '</div>',
    },

    //==마포구==
    {
        title: "난지천공원",
        latlng: new kakao.maps.LatLng(37.57471526045475, 126.88375247912776),
        content:
            '<div class="wrap">' + 
            '    <div class="info">' + 
            '        <div class="title">' + 
            '           난지천공원' + 
            '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
            '        </div>' + 
            '        <div class="body">' + 
            '            <div class="img">' +
            '                <img src="https://lh5.googleusercontent.com/p/AF1QipNNIPAPat6rUMjVRk9VeAZem18mGDuTKZD49Kin=w426-h240-k-no" width="73" height="70">' +
            '           </div>' + 
            '            <div class="desc">' + 
            '                <div class="ellipsis">서울특별시 마포구 상암동</div>' + 
              
            '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '</div>',
    },
    {
        title: "망원한강공원",
        latlng: new kakao.maps.LatLng(37.55785825871765, 126.89724937893698),
        content:
            '<div class="wrap">' + 
            '    <div class="info">' + 
            '        <div class="title">' + 
            '           망원한강공원' + 
            '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
            '        </div>' + 
            '        <div class="body">' + 
            '            <div class="img">' +
            '                <img src="https://lh5.googleusercontent.com/p/AF1QipNNIPAPat6rUMjVRk9VeAZem18mGDuTKZD49Kin=w426-h240-k-no" width="73" height="70">' +
            '           </div>' + 
            '            <div class="desc">' + 
            '                <div class="ellipsis">서울특별시 마포구 망원동 222-1</div>' + 
              
            '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '</div>',
    },
    //==종로구==
    {
        title: "종로구한강다목적운동장",
        latlng: new kakao.maps.LatLng(37.577477334484406, 126.85845624827328),
        content:
            '<div class="wrap">' + 
            '    <div class="info">' + 
            '        <div class="title">' + 
            '           종로구한강다목적운동장' + 
            '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
            '        </div>' + 
            '        <div class="body">' + 
            '            <div class="img">' +
            '                <img src="https://lh5.googleusercontent.com/p/AF1QipNNIPAPat6rUMjVRk9VeAZem18mGDuTKZD49Kin=w426-h240-k-no" width="73" height="70">' +
            '           </div>' + 
            '            <div class="desc">' + 
            '                <div class="ellipsis">경기도 고양시 덕양구 덕은동 519-18</div>' + 
              
            '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '</div>',
    },
    //==은평구==
    {
        title: "은평구립축구장",
        latlng: new kakao.maps.LatLng(37.63076215965836, 126.92477976260398),
        content:
            '<div class="wrap">' + 
            '    <div class="info">' + 
            '        <div class="title">' + 
            '           은평구립축구장' + 
            '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
            '        </div>' + 
            '        <div class="body">' + 
            '            <div class="img">' +
            '                <img src="https://lh5.googleusercontent.com/p/AF1QipNNIPAPat6rUMjVRk9VeAZem18mGDuTKZD49Kin=w426-h240-k-no" width="73" height="70">' +
            '           </div>' + 
            '            <div class="desc">' + 
            '                <div class="ellipsis">서울특별시 은평구 진관동</div>' + 
              
            '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '</div>',
    },
    {
        title: "은평구민축구장",
        latlng: new kakao.maps.LatLng(37.630784040948214, 126.92478386437637),
        content:
            '<div class="wrap">' + 
            '    <div class="info">' + 
            '        <div class="title">' + 
            '           은평구민축구장' + 
            '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
            '        </div>' + 
            '        <div class="body">' + 
            '            <div class="img">' +
            '                <img src="https://lh5.googleusercontent.com/p/AF1QipNNIPAPat6rUMjVRk9VeAZem18mGDuTKZD49Kin=w426-h240-k-no" width="73" height="70">' +
            '           </div>' + 
            '            <div class="desc">' + 
            '                <div class="ellipsis">서울특별시 은평구 진관동 362-2</div>' + 
              
            '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '</div>',
    },
    {
        title: "증산체육공원",
        latlng: new kakao.maps.LatLng(37.58451386195282, 126.90264232944779),
        content:
            '<div class="wrap">' + 
            '    <div class="info">' + 
            '        <div class="title">' + 
            '           증산체육공원' + 
            '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
            '        </div>' + 
            '        <div class="body">' + 
            '            <div class="img">' +
            '                <img src="https://lh5.googleusercontent.com/p/AF1QipNNIPAPat6rUMjVRk9VeAZem18mGDuTKZD49Kin=w426-h240-k-no" width="73" height="70">' +
            '           </div>' + 
            '            <div class="desc">' + 
            '                <div class="ellipsis">서울특별시 은평구 증산동</div>' + 
              
            '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '</div>',
    },
];
// 마커 이미지의 이미지 주소입니다
var imageSrc =
    "/images/football-logo.png";

for (var i = 0; i < positions.length; i++) {
    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new kakao.maps.Size(50, 50);

    // 마커 이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
        clickable: true
        
    });
    
    
    iwRemoveable = true; // removeable 속성을 true 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다   
    
    
    var sinfowindow = new kakao.maps.InfoWindow({
        content : positions[i].content,
        removable : iwRemoveable
    });
    kakao.maps.event.addListener(marker, 'click', makeOverListener(map, marker, sinfowindow));
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
} 
//=======여기까지커스텀===


// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();  

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

// 키워드로 장소를 검색합니다
searchPlaces();

// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {

    var keyword = document.getElementById('keyword').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        // alert('키워드를 입력해주세요!');
        return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch( keyword + '축구장', placesSearchCB); 
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);

        // 페이지 번호를 표출합니다
        displayPagination(pagination);

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {

    var listEl = document.getElementById('placesList'), 
    menuEl = document.getElementById('menu_wrap'),
    fragment = document.createDocumentFragment(), 
    bounds = new kakao.maps.LatLngBounds(), 
    listStr = '';
    
    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();
    
    for ( var i=0; i<places.length; i++ ) {

        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
            marker = addMarker(placePosition, i), 
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function(marker, title) {
            kakao.maps.event.addListener(marker, 'mouseover', function() {
                displayInfowindow(marker, title);
            });

            kakao.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
            });

            itemEl.onmouseover =  function () {
                displayInfowindow(marker, title);
            };

            itemEl.onmouseout =  function () {
                infowindow.close();
            };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {

    var el = document.createElement('li'),
    itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                '<div class="info">' +
                '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>' +
                    '   <span class="jibun gray">' +  places.address_name  + '</span>';
    } else {
        itemStr += '    <span>' +  places.address_name  + '</span>'; 
    }
                 
      itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                '</div>';           

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
        imgOptions =  {
            spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage 
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }   
    markers = [];
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i; 

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild (paginationEl.lastChild);
    }

    for (i=1; i<=pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i===pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function(i) {
                return function() {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title) {
    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

    infowindow.setContent(content);
    infowindow.open(map, marker);
}

 // 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {   
    while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
}