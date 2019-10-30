package com.testproject;

import android.app.Application;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import io.invertase.firebase.auth.RNFirebaseAuthPackage; //add fireBase Auth
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage; //add fireStore
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; //add firebase push

import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());

      //add fireBase Auth (https://rnfirebase.io/docs/v5.x.x/auth/android#Install-the-RNFirebase-Authentication-package)
      packages.add(new RNFirebaseAuthPackage()); 
      //add fireStore
      packages.add(new RNFirebaseFirestorePackage()); // <-- Add database
      packages.add(new RNFirebaseMessagingPackage()); // <-- Add push

      return packages;
      
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
