package xyz.menherabot.commands;

import java.lang.management.ManagementFactory;
import java.util.concurrent.TimeUnit;

import javax.annotation.Nonnull;

import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;

public class InfoCommand extends ListenerAdapter {
  @Override
  public void onSlashCommandInteraction(@Nonnull SlashCommandInteractionEvent e) {
    if(!e.getName().equals("info")) return;

    // Thanks to Loritta's code https://github.com/LorittaBot/Loritta/blob/b8502cb667db18cbb18c118924ff22005360a07f/platforms/discord/legacy/src/main/java/com/mrpowergamerbr/loritta/commands/vanilla/discord/BotInfoCommand.kt#L39
    long jvmUptime = ManagementFactory.getRuntimeMXBean().getUptime();

    long days = TimeUnit.MILLISECONDS.toDays(jvmUptime);
		jvmUptime -= TimeUnit.DAYS.toMillis(days);
		long hours = TimeUnit.MILLISECONDS.toHours(jvmUptime);
		jvmUptime -= TimeUnit.HOURS.toMillis(hours);
		long minutes = TimeUnit.MILLISECONDS.toMinutes(jvmUptime);
		jvmUptime -= TimeUnit.MINUTES.toMillis(minutes);
		long seconds = TimeUnit.MILLISECONDS.toSeconds(jvmUptime);
		
		String uptime = days + "d " + hours + "h " + minutes +"m " + seconds +"s";

		Runtime runtime = Runtime.getRuntime();
		int mb = 1024 * 1024;
		long usedMemory = (runtime.totalMemory() - runtime.freeMemory()) / mb;
		long freeMemory = runtime.freeMemory() / mb;
		long maxMemory = runtime.maxMemory() / mb;
		long totalMemory = runtime.totalMemory() / mb;

    e.reply("**AMANDINHA**\n> **Uptime:** " + uptime
     + "\n> **Memória Usada:** " + usedMemory
     + "MB\n> **Memória Disponível:** " + freeMemory
     + "MB\n> **Memória Alocada:** " + totalMemory
     + "MB\n> **Memória Máxima:** " + maxMemory
     + "MB\n> **Threads Ativas:** " + ManagementFactory.getThreadMXBean().getThreadCount()
     ).queue();
  }
}
