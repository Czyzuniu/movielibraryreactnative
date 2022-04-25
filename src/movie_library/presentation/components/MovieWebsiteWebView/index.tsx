import {WebView, WebViewProps} from 'react-native-webview';
import React from 'react';

type Props = Pick<WebViewProps, 'source'>;

export default function MovieWebsiteWebView(props: Props) {
  return <WebView startInLoadingState={true} {...props} />;
}
