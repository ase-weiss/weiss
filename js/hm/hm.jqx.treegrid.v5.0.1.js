var HmTreeGrid = {

	/**
	 * 트리그리드 생성시 명칭옆에 장비대수 카운팅 표시
	 * 
	 * @param $tree
	 * @param type
	 * @param fnSelect
	 * @param params 조건 설정 ( 프로퍼티당 ','로 구분 -> (프로퍼티) devKind1, devKind2 )
	 * @param filterArray  검색조건 설정  ( null: 전체, grpName, devIp)  ex) ['grpName']
	 */
	createAuth : function($treeGrid, type, fnSelect, params, theme) {
		var url = undefined;
		if (theme === undefined) theme = jqxTheme;
		if ($.isEmpty(params)) params = {};

		switch (type) {
			case HmTree.T_AUTH_MENU:
				url = '/menu/getMenuListAll.do';
				break;
			default:
				return;
		}
		var adapter = new $.jqx.dataAdapter({
			datatype : 'json',
			root : 'resultData',
			url : ctxPath + url,
			dataFields: [
				{ name: 'menuNo', type: 'number' },
				{ name: 'pageGrpNo', type: 'number' },
                { name: 'menuName', type: 'string' },
				{ name: 'menuType', type: 'string' }
			],
			hierarchy : {
				keyDataField : { name : 'menuNo' },
				parentDataField : { name: 'pageGrpNo' }
			},
			id : 'menuNo'
		}, {
			async : true,
			formatData : function(data) {
				$.extend(data, params);
				return data;
			}
		});

		$treeGrid.jqxTreeGrid({
			source : adapter,
			width : '100%',
			height : '99.8%',
			theme : jqxTheme,
			altRows : false,
			filterable : true,
			// filterMode: 'simple',
			autoRowHeight : false,
			pageable : false,
			showHeader : false,
            localization : getLocalization('kr'),
			selectionMode : 'singleRow',
			ready : function() {

			},
			columns : [
                {text: '메뉴', datafield: 'menuName'}
            ]
		}).on('rowSelect', function(event) {
			if (fnSelect !== undefined && fnSelect !== null)
				fnSelect(event);
		})
        /**
		 * 2019.3.4 treeGrid의 filter이벤트를 받아 필터링된 노드의 하위노드 visible속성을 제어한다.
		 * TODO 한 노드의 children이 많은 경우에 노드가 오픈상태이면 필터링이 느리다. 해결 방안은?
         */
		.on('filter', function(event) {
			if(event.args.filters.length == 0) return;
            var rows = $(this).jqxTreeGrid('getView');
            if(rows.length == 0) return;
            var $treeGrid = $(this);
            $treeGrid.jqxTreeGrid('beginUpdate');
            // HmTreeGrid.openSearchNode($treeGrid);
			/** 하위노드에 대한 visible속성 제어 */
            $.each(rows[0].records, function(idx, value) {
               HmTreeGrid.visibleChildren($treeGrid, value);
            });
            $treeGrid.jqxTreeGrid('endUpdate');
            $treeGrid.jqxTreeGrid('refresh');
        });
	},


    create : function($treeGrid, type, fnSelect, params, filterArray, theme) {
        var url = undefined;
        if (theme === undefined) theme = jqxTheme;
        if ($.isEmpty(params)) params = {};

        var cols = [];
        if (filterArray === undefined || filterArray.length == 0) {
            cols = [
                { text: '명칭', dataField: 'grpName' },
                // { text: 'IP', datafield: 'devIp', hidden: true }
            ]
        } else {
            filterArray.forEach(function (entry) {
                switch (entry) {
                    case  "grpName" :
                        cols.push({ text: '명칭', dataField: 'grpName' });
                        break;
                    // case  "devIp" :
                    //     cols.push({ text: 'IP', datafield: 'devIp' });
                    //     break;
                }
            });
        }
        var checkboxes = false;
        if(type == HmTree.T_AP_FILTER_GRP || type == HmTree.T_GRP_DEFAULT3 || type == HmTree.T_GRP_DEFAULT4){
            checkboxes = function (rowKey, dataRow) {
                    return true;
            }
        }

        url = HmTree.getUrlByType(type);

        // 장비까지 조회하는 파라미터 추가
        if(type == HmTree.T_GRP_DEFAULT2
            || type == HmTree.T_GRP_DEFAULT3
            || type == HmTree.T_GRP_DEFAULT4
            || type == HmTree.T_GRP_SEARCH2
            || type == HmTree.T_GRP_SERVER2
            || type == HmTree.T_GRP_MANG2
            || type == HmTree.T_GRP_MANGFLOW2
            || type == HmTree.T_AP_GRP_DEFAULT
            || type == HmTree.T_L4_GRP_DEFAULT
            || type == HmTree.T_GRP_TMS
            || type == HmTree.T_GRP_FW
            || type == HmTree.T_GRP_WAS
            || type == HmTree.T_GRP_WAS
            || type == HmTree.T_GRP_DBMS) {
            params.isContainDev = false
        }

        var adapter = new $.jqx.dataAdapter({
            datatype : 'json',
            root : 'resultData',
            url : ctxPath + url,
            dataFields: [
                { name: 'grpNo', type: 'string' },
                { name: 'grpParent', type: 'number' },
                { name: 'strGrpParent', type: 'string' },
                { name: 'grpName', type: 'string' },
                { name: 'devKind1', type: 'string' },
                { name: 'devKind2', type: 'string' },
                { name: 'devIp', type: 'string' },
                { name: 'grpCode', type: 'string' },
                { name: 'sortIdx', type: 'number'},
                { name: 'grpRef', type: 'number'}
            ],
            hierarchy : {
                keyDataField : { name : 'grpNo' },
                parentDataField : { name : (type == HmTree.T_GRP_TMS ||  type == HmTree.T_GRP_FW ||  type == HmTree.T_AP_FILTER_GRP) ? 'strGrpParent' : 'grpParent' }
            },
            id : 'grpNo'
        }, {
            async : true,
            formatData : function(data) {
                $.extend(data, params);
                return data;
            }
        });

        $treeGrid.jqxTreeGrid({
            source : adapter,
            width : '100%',
            height : '100%',
            theme : jqxTheme,
            altRows : false,
            filterable : true,
            // filterMode: 'simple',
            autoRowHeight : false,
            filterHeight: 34,
            renderToolbar: function(toolbar) {

            },
            pageable : false,
            showHeader : false,
            checkboxes: checkboxes,
            hierarchicalCheckboxes: checkboxes,
            localization : getLocalization('kr'),
            selectionMode : 'singleRow',
            icons : function(rowKey, rowData) {
                try {
                    if(rowData.hasOwnProperty('devKind2')) {
                        var _devKind2 = (rowData.devKind2 || '').toUpperCase();
                        var _iconImg = 'etc.svg';
                        switch(_devKind2) {
                            case 'GROUP':
                                if (type === HmTree.T_GRP_SEARCH && rowData.grpParent === 0) {
                                    _iconImg = 'category.png';
                                } else {
                                    if(rowData.grpNo == 1){
                                        //_iconImg = 'group.svg';
                                        _iconImg = 'grpAll.png';
                                    }else{
                                        //_iconImg = 'group.svg';
                                        if(rowData.grpRef == 1){
                                            _iconImg = 'grpTop.png';
                                        }else if(rowData.grpRef == 2){
                                            _iconImg = 'grpMidd.png';
                                        }else if(rowData.grpRef == 3) {
                                            _iconImg = 'grpBottom.png';
                                        }
                                    }
                                }
                                break;
                            case 'BACKBONE':
                                _iconImg = 'backbone.svg';
                                break;
                            case 'FIREWALL':
                                _iconImg = 'firewall.svg';
                                break;
                            case 'ROUTER':
                                _iconImg = 'router.svg';
                                break;
                            /*case 'WINDOWS':
                                _iconImg = 'windows.svg';
                                break;
                            case 'LINUX':
                                _iconImg = 'linux.svg';
                                break;*/
                            default:
                                if(_devKind2.endsWith('SWITCH')) {
                                    _iconImg = 'switch.svg';
                                }else if(_devKind2.toUpperCase().indexOf('WIN')>-1){
                                    _iconImg = 'windows.svg'
                                }else if(_devKind2.toUpperCase().indexOf('LINUX')>-1){
                                    _iconImg = 'linux.svg'
                                }else if(_devKind2.toUpperCase().indexOf('AIX')>-1){
                                    _iconImg = 'aix.svg'
                                }else if(_devKind2.toUpperCase().indexOf('SOLAR')>-1){
                                    _iconImg = 'solaris.svg'
                                }else if(_devKind2.toUpperCase().indexOf('HP')>-1){
                                    _iconImg = 'hpux.svg'
                                }
                                else {
                                    // _iconImg = 'etc.svg';
                                    _iconImg = (rowData.hasOwnProperty('devKind1') && rowData.devKind1 == 'SVR') ? 'server.svg' : 'etc.svg';
                                }
                                break;
                        }
                        return ctxPath + '/img/tree/v5.0.1/' + _iconImg;
                    }
                    else {
                        return ctxPath + '/img/tree/p_tree.png';
                    }
                } catch (e) {
                    return ctxPath + '/img/tree/p_tree.png';
                }
            },
            ready : function() {
                var uid = null;
                var rows = $treeGrid.jqxTreeGrid('getRows');
                if (rows != null && rows.length > 0) {
                    if(params.hasOwnProperty('isRootSelect') && params.isRootSelect == false) {
                        if(type == HmTree.T_GRP_MANG || type == HmTree.T_GRP_MANG2) {
                            var tmp = rows[0];
                            if(tmp.records != null && tmp.records.length > 0) {
                                uid = tmp.records[0].uid;
                            }
                        }
                    }
                    else {
                        uid = $treeGrid.jqxTreeGrid('getKey', rows[0]);
                    }
                }
                if (uid != null) {
                    $treeGrid.jqxTreeGrid('expandRow', $treeGrid.jqxTreeGrid('getKey', rows[0]));
                    if(type == HmTree.T_AP_FILTER_GRP) {
                        $treeGrid.jqxTreeGrid('checkRow', uid);
                    }
                    // $treeGrid.jqxTreeGrid('selectRow', uid); // 트리 생성 시 최상위 그룹 선택
                }
            },
            columns : cols
        }).on('rowSelect', function(event) {
            if (fnSelect !== undefined && fnSelect !== null)
                fnSelect(event);
        })
        /**
         * 2019.3.4 treeGrid의 filter이벤트를 받아 필터링된 노드의 하위노드 visible속성을 제어한다.
         * TODO 한 노드의 children이 많은 경우에 노드가 오픈상태이면 필터링이 느리다. 해결 방안은?
         */
            .on('filter', function(event) {
                if(event.args.filters.length == 0) return;
                var rows = $(this).jqxTreeGrid('getView');
                var keyword = event.args.filters[0].filter.getfilters()[0].value;
                if(rows.length == 0) return;
                var $treeGrid = $(this);
                $treeGrid.jqxTreeGrid('beginUpdate');
                // HmTreeGrid.openSearchNode($treeGrid);
                /** 하위노드에 대한 visible속성 제어 */
                $.each(rows[0].records, function(idx, value, keyword) {
                    HmTreeGrid.visibleChildren($treeGrid, value, keyword);
                });
                $treeGrid.jqxTreeGrid('endUpdate');
                $treeGrid.jqxTreeGrid('refresh');
            });
    },

	updateData : function($treeGrid, type, params, isExpandAll) {
		var url = undefined;
		if(isExpandAll === undefined) isExpandAll = false;
		if ($.isEmpty(params))
			params = {};

        url = HmTree.getUrlByType(type);

		// 장비까지 조회하는 파라미터 추가
		if(type == HmTree.T_GRP_DEFAULT2
                || type == HmTree.T_GRP_DEFAULT3
                || type == HmTree.T_GRP_DEFAULT4
				|| type == HmTree.T_GRP_SEARCH2
				|| type == HmTree.T_GRP_SERVER2 
				|| type == HmTree.T_GRP_MANG2
				|| type == HmTree.T_GRP_MANGFLOW2) {
			params.isContainDev = false
		}

		var adapter = new $.jqx.dataAdapter({
			datatype : 'json',
			root : 'resultData',
			url : ctxPath + url,
			hierarchy : {
				keyDataField : {
					name : 'grpNo'
				},
				parentDataField : {
					name : 'grpParent'
				}
			},
			id : 'grpNo'
		}, {
			async : true,
			formatData : function(data) {
				$.extend(data, params);
				return data;
			}
		});
		
		var curTreeItem = HmTreeGrid.getSelectedItem($treeGrid);
		$treeGrid.on('bindingComplete', function(event) {
			if(isExpandAll && curTreeItem != null) {
				$treeGrid.jqxTreeGrid('expandAll');
				$treeGrid.jqxTreeGrid('selectRow', curTreeItem.uid);
			}
			else {
				var rows = $treeGrid.jqxTreeGrid('getRows');
				if (rows != null && rows.length > 0) {
					$treeGrid.jqxTreeGrid('expandRow', $treeGrid.jqxTreeGrid('getKey', rows[0]));
					var _uid = $treeGrid.jqxTreeGrid('getKey', rows[0]);
					$treeGrid.jqxTreeGrid('selectRow', _uid);
				}
			}
			$treeGrid.off('bindingComplete');
		});

		if(type == HmTree.T_GRP_TOPO_AUTHCONF || type == HmTree.T_GRP_DEFAULT4) {
            $treeGrid.jqxTreeGrid('source')._options.formatData =
				function(data) {
                    $.extend(data, params);
					return data;
				};
		}
        $treeGrid.jqxTreeGrid('source')._source.url = ctxPath + url;
		$treeGrid.jqxTreeGrid('updateBoundData');
	},

	/** 선택된 트리아이템 리턴 */
	getSelectedItem : function($treeGrid) {
		var selection = $treeGrid.jqxTreeGrid('getSelection');
		if (selection != null && selection.length > 0) {
			return selection[0];
		}
		return null;
	},

    updateRow: function($treeGrid, rowid, datafield, newvalue) {
        var rowdata = $treeGrid.jqxTreeGrid('getRow', rowid);
        if(rowdata != null) {
            rowdata[datafield] = newvalue;
            $treeGrid.jqxTreeGrid('updateRow', rowid, rowdata);
        }
    },

    /**
     * treeGrid의 sortIdx값을 업데이트 한 후 sortIdx컬럼으로 asc 정렬한다.
     * @param $treeGrid
     * @param sortData (grpNo: ?, sortIdx: ?)
     */
    updateSortIdx: function($treeGrid, sortData) {
        $treeGrid.jqxTreeGrid('beginUpdate');
        $.each(sortData, function(idx, value) {
            HmTreeGrid.updateRow($treeGrid, value.grpNo, 'sortIdx', value.sortIdx);
        });
        $treeGrid.jqxTreeGrid('endUpdate');
        $treeGrid.jqxTreeGrid('sortBy', 'sortIdx', 'asc');
    },
	
	/** 트리노드 오픈 */
	expandParentRow: function($treeGrid, rowKey) {
		var nodeItem = $treeGrid.jqxTreeGrid('getRow', rowKey);
		if(nodeItem == null || nodeItem.level == 0) return;
		HmTreeGrid.expandParentRow($treeGrid, nodeItem.parent.uid);
        $treeGrid.jqxTreeGrid('expandRow', nodeItem.parent.uid);
	},

    /** 필터에 해당하는 노드까지의 상위노드를 오픈 */
    openSearchNode: function($treeGrid) {
        var rows = $treeGrid.jqxTreeGrid('getView');
        if(rows.length == 0) return;
        $.each(rows, function(idx, row) {
            $treeGrid.jqxTreeGrid('expandRow', row.uid);
            HmTreeGrid.openChildNode($treeGrid, row);
        });
    },

    openChildNode: function($treeGrid, nodeItem) {
        if(nodeItem.records.length > 0) {
            $.each(nodeItem.records, function(idx, value) {
                if(value.records.length > 0) {
                    $treeGrid.jqxTreeGrid('expandRow', value.uid);
                    HmTreeGrid.openChildNode($treeGrid, value);
                }
            });
        }
    },

    /** leaf까지의 노드를 visible */
    visibleChildren: function($treeGrid, item, keyword) {
        if(item == null) return;
        if(item._visible == true && !item.hasOwnProperty('leaf')) { // leaf노드인지 확인
            var records = item.records.length == 0? $treeGrid.jqxTreeGrid('getRow', item.uid).records : item.records;
            $.each(records, function(idx, value) {
                var row = $treeGrid.jqxTreeGrid('getRow', value.uid);
                // if((row.name).indexOf($('#csTreeName').val()) != -1)
                // {
                    $.each(row.records, function(i,v){
                        var is = v.grpName.indexOf(keyword);
                        if(is > -1) v._visible = true; // 검색된 키워드가 포함하는 것만 보이도록 설정
                        // v._visible = true;
                    });
                // }
                row._visible = true;
                /**
                 * 인자로 받은 value객체를 넘겨야 필터링된 데이터가 출력된다. getRow함수로 찾은 row를 넘기면 하위의 모든 node를 출력해 버림.
                 * @date 2017. 8. 4
                 *  @author jjung
                 */
                HmTreeGrid.visibleChildren($treeGrid, value);
            });
            $treeGrid.jqxTreeGrid('expandRow', item.uid); //필터링된 최하위 노드까지 오픈
        }
    },


    /** 게시판 상태 */
    boardStatusrenderer: function(row, datafield, value) {
        if (value == null)
            return;
        var cell;
        switch (value.toString()) {
            case "요청":
                cell = "<div style='margin-top: 2px; margin-bottom: 2px;'  class='jqx-center-align'>";
                cell += "<img src='" + ctxPath + "/img/Grid/apply.png' alt='" + value + "' />";

            	if ($('#gSiteName').val() === 'Samsung') {
                    cell = "<div style='margin-top: 2px; margin-bottom: 2px; width: 92%'  class='jqx-center-align evtName evt request'>REQUEST";
				}
                break;
            case "처리":
                cell = "<div style='margin-top: 2px; margin-bottom: 2px;'  class='jqx-center-align'>";
                cell += "<img src='" + ctxPath + "/img/Grid/check.png' alt='" + value + "' />";

                if ($('#gSiteName').val() === 'Samsung') {
                    cell = "<div style='margin-top: 2px; margin-bottom: 2px; width: 92%'  class='jqx-center-align evtName evt cleared'>CLEARED";
                }
                break;
            default:
                return value.toString();
        }
        cell += "</div>";
        return cell;
    },

    /** 장애등급 */
    evtLevelrenderer: function(row, datafield, value) {
        if (value == null)
            return;
        var cell;
        switch (value.toString()) {
            case "-1":
            case "조치중":
                cell = "<div style='margin-top: 2px; margin-bottom: 2px; width: 92%'  class='jqx-center-align evtName evt processing'>" + $('#sEvtLevelMeasure').val();
            case "0":
			case "정상":
                cell = "<div style='margin-top: 2px; margin-bottom: 2px; width: 92%'  class='jqx-center-align evtName evt normal'>" + $('#sEvtLevel0').val();
                break;
            case "1":
            case "정보":
                cell = "<div style='margin-top: 2px; margin-bottom: 2px; width: 92%'  class='jqx-center-align evtName evt info'>" + $('#sEvtLevel1').val();
                break;
            case "2":
            case "주의":
                cell = "<div style='margin-top: 2px; margin-bottom: 2px; width: 92%'  class='jqx-center-align evtName evt warning'>" + $('#sEvtLevel2').val();
                break;
            case "3":
            case "알람":
                cell = "<div style='margin-top: 2px; margin-bottom: 2px; width: 92%'  class='jqx-center-align evtName evt minor'>" + $('#sEvtLevel3').val();
                break;
            case "4":
            case "경보":
                cell = "<div style='margin-top: 2px; margin-bottom: 2px; width: 92%'  class='jqx-center-align evtName evt major'>" + $('#sEvtLevel4').val();
                break;
            case "5":
            case "장애":
                cell = "<div style='margin-top: 2px; margin-bottom: 2px; width: 92%'  class='jqx-center-align evtName evt critical'>" + $('#sEvtLevel5').val();
                break;
            default:
                return value.toString();
        }
        cell += "</div>";
        return cell;
    }
};