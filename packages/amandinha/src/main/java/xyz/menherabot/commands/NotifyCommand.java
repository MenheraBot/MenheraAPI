package xyz.menherabot.commands;

import javax.annotation.Nonnull;

import net.dv8tion.jda.api.entities.Role;
import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import xyz.menherabot.Constants;

public class NotifyCommand extends ListenerAdapter{
  @Override
  public void onSlashCommandInteraction(@Nonnull SlashCommandInteractionEvent e) {
    if(!e.getName().equals("atualizações")) return;

      Role role = e.getGuild().getRoleById(Constants.NOTIFY_ROLE);

      if(e.getMember().getRoles().contains(role)) {
        e.getGuild().removeRoleFromMember(e.getMember(), role).queue();
        e.reply("Como desejar! Você não será mais notificado das atualizações da Menhera!").queue();
        return;
      }

      e.getGuild().addRoleToMember(e.getUser(), role).queue();
      e.reply("Feitoria! Você será notificado das atualizações da Menhera").queue(); 
      return;
    }
}
