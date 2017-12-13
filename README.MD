# BOILERPLATE - REACT - CORDOVA


## Proximas atualizações
- Usar higher order components para propagar alterações e evitar redraws
- OK Usar redux-form para binding (exemplo nome -- adicionar reduxForm Plugin para acompanhar
- Adicionar o Normalizr https://github.com/paularmstrong/normalizr
- OK Usar Axios(https://github.com/mzabriskie/axios)  ao inves de Fetch
- Ordernacao/ Filtros Reselect(https://github.com/reactjs/reselect)


# Instalacao

### instalar o nvm
https://github.com/coreybutler/nvm-windows/releases

### Ver o ultimo disponivel, instalar e usar via nvm
```bash
nvm list available
nvm install [versao]
nvm use [versao]
```

### Instalar atualizações dos pacotes (opcional)
Usado para manter os pacotes na ultima versao - cuidado com incompatibilidades
```bash
npm install -g npm-check-updates
ncu -u
ncu -a
```

## Arrume as dependencias do ESLINT
Alterar as dependecias seguintes
```bash
npm info "eslint-config-airbnb@latest" peerDependencies
```



### Instalando componentes gerais
```bash
npm install -g cordova
npm install -g webpack
```


### Instalando componentes do npm
```bash
npm install
```

### Compilando (opcional)
Se executar com :prod irá compilar para produção (minify, etc)
```bash
npm run compile:prod
npm run compile
```

###Instalar as plataformas no cordova
```bash
cordova platform add browser
cordova platform add windows
cordova platform add android
cordova platform add ios
```

### Definir pastas para o android e java
Por exemplo - recomendado adicionar ao PATH
```bash
set ANDROID_HOME=C:\Users\user\AppData\Local\Android\sdk
set JAVA_HOME=C:\Program Files\Java\jdk1.8.0_121
```


### Executando
#### Para compilar em produção - rodar o comando com :prod ao fim

Apenas compilar os fontes
```bash
npm run compile
npm run compile:prod
```

Rodar em browser sem o cordova
```bash
npm run browser
```

Rodar em browser / android / ios / windows (cordova)  ou desktop com o electron
```bash
npm run cbrowser
npm run android
npm run ios
npm run windows
npm run electron
```


Gerar os fontes de produção de cada linguagem
```bash
npm run build:android
npm run build:ios
npm run build:windows
npm run build:electron
```

### Para abilitar o Linter no atom
de acordo com https://gist.github.com/darokel/90fe5c8ad8df5efcab6b
Só dar o install no projeto  
Download Atom and get these two packages: Linter and [Linter-ESLint)(https://atom.io/packages/linter-eslint)


### Pacotes uteis cordova

- Barcode Scanner (https://github.com/phonegap/phonegap-plugin-barcodescanner)
- Whitelist Plugin (https://github.com/apache/cordova-plugin-whitelist)
- IONIC Keyboard (https://github.com/driftyco/ionic-plugin-keyboard)
- Native Modal (http://www.gajotres.net/how-to-show-different-native-modal-windows-in-ionic-framework/)
- Screen Orientation (https://github.com/gbenvenuti/cordova-plugin-screen-orientation)
- Inapp Browser (https://github.com/apache/cordova-plugin-inappbrowser)


### Alterações ios em caso de request HTTPS sem certificado válido
Em resources/info.plist adicionar/substituir a chave
```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSExceptionDomains</key>
    <dict>
        <key>wlapst.tiona.com.br</key>
        <dict>
            <key>NSIncludesSubdomains</key>
            <true/>
            <key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
            <true/>
            <key>NSTemporaryExceptionMinimumTLSVersion</key>
            <string>TLSv1.0</string>
            <key>NSTemporaryExceptionRequiresForwardSecrecy</key>
            <false/>
        </dict>
        </dict>
    </dict>
```
Em appDelegate.m adcionar no final
```bash
@implementation NSURLRequest(DataController)
+ (BOOL)allowsAnyHTTPSCertificateForHost:(NSString *)host
  {
    return YES;
  }
@end
```



#### Alterações Android em caso de request HTTPS sem certificado válido

Em project/platforms/android/CordovaLib/src/org/apache/cordova/engine/SystemWebViewClient.java
alterar o seguinte metodo
```javascript
public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
  final String packageName = this.cordova.getActivity().getPackageName();
  final PackageManager pm = this.cordova.getActivity().getPackageManager();

  ApplicationInfo appInfo;
  try {
    appInfo = pm.getApplicationInfo(packageName, PackageManager.GET_META_DATA);
    if ((appInfo.flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0) {
      // debug = true
      handler.proceed();
      return;
    } else {
      // debug = false
      // THIS IS WHAT YOU NEED TO CHANGE:
      // 1. COMMENT THIS LINE
      // super.onReceivedSslError(view, handler, error);
      // 2. ADD THESE TWO LINES
      // ---->
      handler.proceed();
      return;
      // <----
    }
  } catch (NameNotFoundException e) {
    // When it doubt, lock it out!
    super.onReceivedSslError(view, handler, error);
  }
}
```
