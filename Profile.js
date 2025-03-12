import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";

const ProfileScreen = () => {
  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      {/* ปุ่มย้อนกลับ */}
      <TouchableOpacity className="absolute top-12 left-4">
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Avatar */}
      <View className="bg-yellow-400 rounded-full w-24 h-24 flex items-center justify-center">
        <Ionicons name="person-outline" size={48} color="white" />
      </View>

      {/* User ID */}
      <View className="flex-row items-center mt-4">
        <Text className="text-gray-500 text-lg">ID :</Text>
        <View className="bg-gray-200 px-3 py-1 rounded-lg ml-2 flex-row items-center">
          <Text className="text-gray-700">user12345678</Text>
          <TouchableOpacity className="ml-2">
            <Ionicons name="copy-outline" size={16} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ปุ่มเพิ่มเพื่อน */}
      <TouchableOpacity className="bg-red-500 mt-6 px-10 py-3 rounded-full">
        <Text className="text-white text-lg font-bold">เพิ่มเพื่อน</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
