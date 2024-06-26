package edu.hongikuniversity.graduation.project.kalculator.configuration;

import edu.hongikuniversity.graduation.project.kalculator.service.BattleGroupsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
@RequiredArgsConstructor
public class SchedulerConfig {
    private final BattleGroupsService battleGroupsService;
    @Scheduled(cron = "0 0 0 * * ?") // 매일 자정에 실행
    public void scheduleTaskUsingCronExpression() {
        battleGroupsService.updateGroupStatuses();
    }
}
