import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, ImageBackground } from "react-native";
import NativeAdView from "react-native-admob-native-ads";
import {
  AdBadge,
  AdvertiserView,
  CallToActionView,
  HeadlineView,
  IconView,
  TaglineView,
} from "react-native-admob-native-ads";
import LinearGradient from "react-native-linear-gradient";

const MyNativeAd = () => {
  return (
    <View style={styles.container}>
      <NativeAdView
        responseId="ca-app-pub-3940256099942544/2247696110" // Test ID
        adsManager="ca-app-pub-3940256099942544/2247696110"
        onAdLoaded={() => console.log("✅ Ad Loaded")}
        onAdFailedToLoad={(error) => console.error("❌ Ad Failed:", error)}
      >
        {/* Background Image for Better UI */}
        <ImageBackground
          source={{ uri: "https://source.unsplash.com/600x300/?technology,business" }}
          style={styles.adContainer}
          imageStyle={{ borderRadius: 16 }}
        >
          <View style={styles.overlay} />
          <AdBadge style={styles.adBadge} />

          {/* Ad Content */}
          <View style={styles.adContent}>
            {/* Ad Icon */}
            <View style={styles.iconWrapper}>
              <IconView style={styles.icon} />
            </View>

            {/* Text Content */}
            <View style={styles.textContainer}>
              <HeadlineView style={styles.headline} />
              <TaglineView style={styles.tagline} />
              <AdvertiserView style={styles.advertiser} />
            </View>
          </View>

          {/* Call to Action Button */}
          <TouchableOpacity style={styles.callToAction}>
            <LinearGradient colors={["#ff8c00", "#ff4500"]} style={styles.callToActionGradient}>
              <CallToActionView style={styles.callToActionText} />
            </LinearGradient>
          </TouchableOpacity>
        </ImageBackground>
      </NativeAdView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  adContainer: {
    borderRadius: 16,
    overflow: "hidden",
    padding: 16,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#FFA500",
    marginBottom: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Adds a dark overlay for readability
    borderRadius: 16,
  },
  adBadge: {
    alignSelf: "flex-end",
    backgroundColor: "#FFD700",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  adContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    marginRight: 12,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  textContainer: {
    flex: 1,
  },
  headline: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff", // White text for better contrast
  },
  tagline: {
    fontSize: 15,
    color: "#eee",
    marginTop: 4,
  },
  advertiser: {
    fontSize: 13,
    color: "#FFD700",
    marginTop: 4,
    fontWeight: "500",
  },
  callToAction: {
    marginTop: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  callToActionGradient: {
    paddingVertical: 14,
    alignItems: "center",
  },
  callToActionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default MyNativeAd;
