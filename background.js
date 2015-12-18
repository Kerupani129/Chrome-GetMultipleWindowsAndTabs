// 
// Clipboard オブジェクト
// 
var Clipboard = {
	
	// 
	// 取得
	// 
	get: function() {
		var str;
		var textArea = document.createElement("textarea");
		
		// バッファ非表示 (display だとダメ)
		textArea.style.position = "absolute";
		textArea.style.left = "-100%";
		
		// バッファ確保
		document.body.appendChild(textArea);
		
		// クリップボードからバッファにコピー
		textArea.select();
		document.execCommand("paste");
		
		// バッファから読み出し
		str = textArea.value;
		
		// バッファ解放
		document.body.removeChild(textArea);
		
		return str;
	},
	
	// 
	// 設定
	// 
	set: function(str) {
		var textArea = document.createElement("textarea");
		
		// バッファ非表示 (display だとダメ)
		textArea.style.position = "absolute";
		textArea.style.left = "-100%";
		
		// バッファ確保
		document.body.appendChild(textArea);
		
		// バッファに書き込み
		textArea.value = str;
		
		// バッファからクリップボードにコピー
		textArea.select();
		document.execCommand("copy");
		
		// バッファ解放
		document.body.removeChild(textArea);
	}
	
};

// 
// URLList オブジェクト
// 
var URLList = {
	
	// 
	// 取得
	// 
	get: function() {
		
		// 全ウィンドウ取得
		chrome.windows.getAll(
			{populate: true},
			function(windows) {
				var URLList = "";
				
				// ウィンドウづつ処理
				for (var w in windows) {
					var tabs = windows[w].tabs;
					
					// タブづつ処理
					for (var t in tabs) {
						if (tabs[t].status == "complete") {
							URLList += "// " + tabs[t].title + "\n";
							URLList += "" + tabs[t].url + "\n";
						}
					}
					
					URLList += "\n";
				}
				
				// 末尾の改行除去
				URLList = URLList.replace(/\n+$/g, "");
				
				// クリップボードに出力
				Clipboard.set(URLList);
				
				// 表示
				alert("リストデータをクリップボードにコピーしました");
			}
		);
		
	}
	
};
