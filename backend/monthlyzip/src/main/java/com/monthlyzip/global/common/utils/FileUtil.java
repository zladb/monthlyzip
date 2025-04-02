package com.monthlyzip.global.common.utils;

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

    public static String saveFile(MultipartFile file) {
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path path = Paths.get(imageDir + filename);
        try {
            Files.createDirectories(path.getParent()); // 디렉토리가 없으면 생성
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new FileStorageException(ApiResponseStatus.FILE_SAVE_FAILED, e);
        }
        return "/images/" + filename;  // 상대 경로로 저장
    }

    public static void deleteFile(String relativePath) {
        Path path = Paths.get(imageDir + relativePath.replace("/images/", ""));
        try {
            Files.deleteIfExists(path);
        } catch (IOException e) {
            throw new FileStorageException(ApiResponseStatus.FILE_DELETE_FAILED, e);
        }
    }
}
