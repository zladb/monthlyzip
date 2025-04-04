package com.monthlyzip.global.common.utils;

import com.monthlyzip.global.common.exception.exception.FileStorageException;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import java.nio.file.StandardCopyOption;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;


@Component
public class FileUtil {

    private static String imageDir;

    public FileUtil(@Value("${app.imageDir}") String imageDir) {
        FileUtil.imageDir = imageDir;
    }

    public static String saveFile(MultipartFile file, String subDir) {
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();

        String dirPath = imageDir + subDir + "/";
        Path path = Paths.get(dirPath + filename);
        try {
            Files.createDirectories(path.getParent()); // 디렉토리가 없으면 생성
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new FileStorageException(ApiResponseStatus.FILE_SAVE_FAILED, e);
        }
        return "/images/" + subDir + "/" + filename;  // 상대 경로로 저장
    }

    public static void deleteFile(String relativePath) {
        // "/images/" 부분을 제거하고 실제 파일 경로 구성
        String filePath = relativePath.replace("/images/", "");
        Path path = Paths.get(imageDir + filePath);
        try {
            Files.deleteIfExists(path);
        } catch (IOException e) {
            throw new FileStorageException(ApiResponseStatus.FILE_DELETE_FAILED, e);
        }
    }
}
