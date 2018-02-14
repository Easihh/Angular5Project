package com.asura.web.utility;

import java.util.Locale;
import java.util.Random;

public class MatchUtility {
	
	private static final String LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
	private static final String UPPPERCASE = LOWERCASE.toUpperCase(Locale.ROOT);
	private static final String DIGITS = "0123456789";
	private static final String ALPHA_NUM = LOWERCASE + UPPPERCASE + DIGITS;
	
	public static String generateMatchIdentifier(int length) {
		StringBuilder sb = new StringBuilder();
		Random random = new Random();
		char[] entries = ALPHA_NUM.toCharArray();
		for (int i = 0; i < length; i++) {
			int chosen = random.nextInt(entries.length);
			sb.append(entries[chosen]);
		}
		System.out.println(sb.toString());
		return sb.toString();
	}
}
