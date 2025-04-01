package com.monthlyzip.global.common.utils;

import com.monthlyzip.global.common.exception.exception.FileStorageException;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

public class FileUtil {

    private static String imageDir;

    public FileUtil(@Value("${app.imageDir}") String imageDir) {
        this.imageDir = imageDir;
    }

    public static String saveFile(MultipartFile file) {
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path path = Paths.get(imageDir + filename);
        try {
            Files.copy(file.getInputStream(), path);
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
