package com.ims.helper;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;
import com.ims.entity.User;
import com.ims.entity.Role;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;

public class CSVHelper {
    public static String TYPE = "text/csv";
    static String[] HEADERs = { "fullName", "email", "password", "phone", "role" };

    public static boolean hasCSVFormat(MultipartFile file) {
        if (file == null || file.getContentType() == null) {
            return false;
        }
        if (!TYPE.equals(file.getContentType()) && !file.getContentType().equals("application/vnd.ms-excel")) {
            return false;
        }
        return true;
    }

    public static List<User> csvToUsers(InputStream is) {
        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8));
                CSVReader csvReader = new CSVReaderBuilder(fileReader).withSkipLines(1).build()) {

            List<User> users = new ArrayList<>();
            List<String[]> rows = csvReader.readAll();

            for (String[] row : rows) {
                System.out.println("Row length: " + row.length + " Content: " + java.util.Arrays.toString(row));
                User user = new User();
                // fullName, email, password, phone, role
                // 0, 1, 2, 3, 4

                if (row.length < 5) {
                    System.out.println("Skipping row due to insufficient columns: " + java.util.Arrays.toString(row));
                    continue; // Skip incomplete rows
                }

                user.setFullName(row[0].trim());
                user.setEmail(row[1].trim());
                user.setPassword(row[2].trim()); // Will be encoded in service
                user.setPhone(row[3].trim());

                try {
                    user.setRole(Role.valueOf(row[4].toUpperCase()));
                } catch (IllegalArgumentException e) {
                    // Default or skip? Let's default to STUDENT if invalid?
                    // Or better, fail? lets defaulting to STUDENT for now or handle appropriately
                    System.out.println("Invalid role: " + row[4] + ", defaulting to STUDENT");
                    user.setRole(Role.STUDENT);
                }

                user.setStatus(true); // Active by default
                users.add(user);
            }

            return users;
        } catch (IOException | com.opencsv.exceptions.CsvException e) {
            throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
        }
    }
}
